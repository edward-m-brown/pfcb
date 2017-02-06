from bs4 import BeautifulSoup
import re, ast, os, operator

anchor_file = open("anchor_map", "r+")
anchor_maps = anchor_file.read()
anchor_maps = ast.literal_eval(anchor_maps)
anchor_file.close()

# get the feat info from local feat pages
# Feat Format:
# 1.) Feat Name
# 2.) Feat Desc
# 3.) Feat Prereqs
# 4.) Benefit
# 5.) Normal
# 6.) Special
# NOTE: Filter strings that contain "[stuff]". Change to '[stuff]'
# TODO: get info from tables within feat entries. Put it into "Benefits" section somehow.


def get_feats(fname):
    href = fname.replace("_", "/")
    anchors = anchor_maps[href]
    feat_file = open("feat_sites/" + fname, "r+")
    try:
        feat_soup = BeautifulSoup(feat_file.read(), 'html.parser')
    except AttributeError as e:
        print(e)
        return None
    page_feats= []
    for anchor in anchors:
        feat_fields = {}
        feat_fields["Name"] = []
        feat_fields["Desc"] = []
        feat_fields["Misc"] = []
        feat_fields["Text"] = ""
        start = feat_soup.find(id=anchor)
        if start:
            # name is one string
            if start.string:
                feat_fields["Name"].append(start.string.strip())
                feat_fields["Text"] += start.string.strip()
            else:
                # name is multiple strings
                for string in start.stripped_strings:
                    feat_fields["Name"].append(string)
                    feat_fields["Text"] += string
            for sibling in start.next_siblings:
                # if the next element in the document is a tag
                if type(sibling) is type(start):
                    # if a paragraph, it is information we want
                    if sibling.name is 'p':
                        # if not bold, it is either description or something to be
                        # added onto the feat body, probably in benefits
                        # TODO: implement getting non-bold
                        if not sibling.b and not sibling.strong:
                            field = "Desc"
                            # single-line description
                            if sibling.string:
                                feat_fields[field].append(sibling.string.strip())
                            else:
                                # multi-line description. Most cases, probably actually a
                                # part of the Benefits section.
                                # On studying Feat entries, it looks like standard Paizo format
                                # is to keep descriptions to one line, so this section will
                                # almost never be a description.
                                # Let's try throwing it into Misc.
                                field = "Misc"
                                for string in sibling.stripped_strings:
                                    feat_fields[field].append(string)
                        # try grabbing strong tags.
                        elif sibling.strong:
                            if sibling.string:
                                # only one line in the given field; this is the key.
                                field = sibling.string.strip()
                                # use entry_title to filter 'Benefit' 'Special', etc. out.
                                entry_title = field
                            # need to make a list at field index to store stripped strings
                            feat_fields[field] = []
                            # go through the rest of the paragraph and get the info.
                            for string in sibling.stripped_strings:
                                if string != entry_title:
                                    feat_fields[field].append(string)
                        else:
                            # this is a feat field: Benefit, Special, etc.
                            # The bold part is the name of the key.
                            # TODO: one page has these in a Strong tag. Change to get those.
                            if sibling.b.string:
                                # only one line in the given field; this is the key.
                                field = sibling.b.string.strip()
                                # use entry_title to filter 'Benefit' 'Special', etc. out.
                                entry_title = field
                            # Following case NEVER HAPPENS. But, I am not taking data from
                            # all pages just yet, so I'll keep it here in case I need it.
                            else:
                                # this is some other thing or weird edge case. Throw it to Misc.
                                for string in sibling.b.stripped_strings:
                                    # might never get here. Test it.
                                    feat_fields["Misc"].append(string)
                            # need to make a list at field index to store stripped strings
                            feat_fields[field] = []
                            # go through the rest of the paragraph and get the info.
                            for string in sibling.stripped_strings:
                                if string != entry_title:
                                    feat_fields[field].append(string)
                    else:
                        # if it's not a tag, we don't want to look at it
                        break
            for key in feat_fields:
                # contacenate the list of strings at each entry.
                feat_fields[key] = " ".join(feat_fields[key])
                # TODO: filter out "[stuff]", replace with '[stuff]'
            page_feats.append(feat_fields)
    feat_file.close()
    return page_feats


def get_feats_fulltext(fname):
    # need this in getFeats
    benefit = re.compile('\ABen')
    prereq = re.compile('\APre')
    special = re.compile('\ASpe')
    normal = re.compile('\ANor')
    subtype= re.compile("\(")
    header_regex = re.compile("h[1-6]")
    href = fname.replace("_", "/")
    anchors = anchor_maps[href]
    feat_file = open("feat_sites/" + fname, "r+")
    try:
        feat_soup = BeautifulSoup(feat_file.read(), 'html.parser')
    except AttributeError as e:
        print(e)
        return None
    page_feats = {}
    for anchor in anchors:
        feat_fields = {}
        feat_fields["Name"] = []
        feat_fields["Text"] = []
        feat_fields["Html"] = ""
        feat_fields["Note"] = []
        feat_fields["Prereq"] = []
        feat_fields["Benefit"] = []
        feat_fields["Normal"] = []
        feat_fields["Special"] = []
        start = feat_soup.find(id=anchor)
        if start:
            feat_fields["Html"] += str(start)
            for string in start.stripped_strings:
                feat_fields["Name"].append(string)
                if re.search(subtype, string): # This feat has a subtype
                    feat_fields["Subtype"] = []
                    subs = string.split('(')[-1].replace(')','') # should just be a comma-delimited list, or one type
                    for sub in subs.split(','):
                        feat_fields["Subtype"].append(sub)
            for sibling in start.next_siblings:
                # check only the contents of other tags
                if type(sibling) is type(start):
                    # get data as long as current tag type isn't a header
                    if not re.match(header_regex,sibling.name): # hitting a header means we've come out of the feat
                        feat_fields["Html"] += str(sibling)
                        for string in sibling.stripped_strings:
                            feat_fields["Text"].append(string)
                        if sibling.name == u'p': # also want to check if we are looking at a special feat field
                            tag_class = sibling.get('class')
                            if tag_class:
                                contents = []
                                for string in sibling.stripped_strings:
                                    contents.append(string)
                                category = contents.pop(0)
                                key = category
                                if tag_class[0] == 'stat-block-1': # This could be a Ben/Pre/Spec/Norm field
                                    if re.match(benefit, category):
                                        key = "Benefit"
                                    elif re.match(prereq, category):
                                        key = "Prereq"
                                    elif re.match(special, category):
                                        key = "Special"
                                    elif re.match(normal, category):
                                        key = "Normal"
                                elif tag_class[0] == 'stat-block-2': # This is likely some side note about the feat
                                    key = "Note"
                                for string in contents:
                                    try:
                                        feat_fields[key].append(string)
                                    except:
                                        feat_fields[key] = []
                                        feat_fields[key].append(string)
                    # If we've hit a header, we're probably not in the feat description any more. Stop looping.
                    else:
                        break
            for key in ["Name", "Text", "Note", "Prereq", "Benefit", "Normal", "Special"]:
                feat_fields[key] = " ".join(feat_fields[key])
        else:
            feat_fields["Name"] = anchor
            feat_fields["Text"] = href + "#" + anchor + " COULD NOT BE FOUND"
        page_feats[anchor] = feat_fields
    return page_feats, feat_soup



# int main()
rootDir = "feat_sites/"
html_files = os.listdir(rootDir)
all_feats = {}
soups = {}
for filename in html_files:
    all_feats[filename], soups[filename]  = get_feats_fulltext(filename)
