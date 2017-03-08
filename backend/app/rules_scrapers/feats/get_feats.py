from bs4 import BeautifulSoup
import re, ast, os

dirname = os.path.dirname(os.path.abspath(__file__))
anchor_file = open(dirname + "/anchor_map", "r+")
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


def get_feats(fname):
    # need this in getFeats
    benefit = re.compile('\ABen')
    prereq = re.compile('\APre')
    special = re.compile('\ASpe')
    normal = re.compile('\ANor')
    subtype= re.compile("\(")
    header_regex = re.compile("h[1-6]")
    href = fname.replace("_", "/")
    anchors = anchor_maps[href]
    feat_file = open(dirname + "/feat_sites/" + fname, "r+")
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
                                        feat_fields[key].append(string.strip(" :."))
                                    except:
                                        feat_fields[key] = []
                                        feat_fields[key].append(string.strip(" :."))
                    # If we've hit a header, we're probably not in the feat description any more. Stop looping.
                    else:
                        break
            for key in ["Name", "Text", "Note", "Prereq", "Benefit", "Normal", "Special"]:
                feat_fields[key] = """ """.join(feat_fields[key])
            feat_fields["Prereq"] = feat_fields["Prereq"].split(',')
            feat_fields["Html"] = feat_fields["Html"].replace("\n", "")
        else:
            feat_fields["Name"] = anchor
            feat_fields["Text"] = "COULD NOT BE FOUND"
        page_feats[anchor] = feat_fields
    return page_feats


def scrape_all_feats():
    root_dir = dirname + "/feat_sites/"
    html_files = os.listdir(root_dir)
    all_feats = {}
    soups = {}
    for filename in html_files:
        all_feats[filename] = get_feats(filename)
    return all_feats


def scrape_core_feats():
    fname = '_pathfinderRPG_prd_coreRulebook_feats.html'
    return get_feats(fname)