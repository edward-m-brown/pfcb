from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re, ast, os, operator, glob

# get the spell info from local spell pages
# Spell Format:
# in <div class="body">
# 1.) <p class="stat-block-title">Spell Name
# (the rest appear in <p class="stat-block-1"> elements)
# 2.) School;Level (includes classes that have access)
# 3.) Casting Time
# 4.) Components V, S, M, special)
# 5.) Range
# 6.) Area
# 7.) Duration
# 8.) Saving throw;Spell Resistance
# (in last <p> sibling of .stat-block-title)
# 9.) Spell description
src_dir = "spell_sites/"


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
            feat_fields["Prereq"] = feat_fields["Prereq"].split(',')
        else:
            feat_fields["Name"] = anchor
            feat_fields["Text"] = "COULD NOT BE FOUND"
        page_feats[anchor] = feat_fields
    return page_feats, feat_soup

def get_spells(filename, spellname):
    # entries will end on stat-block-title or a <div class='footer'>
    spell_file = open(src_dir + filename, "r+")
    try:
        spell_soup = BeautifulSoup(spell_file.read())
    except AttributeError as e:
        print(e)
        return None
    spell_fields = {}
    spell_fields["Name"] = []
    spell_fields["School"] = ""
    spell_fields["Level"] = ""
    spell_fields["Time"] = ""
    spell_fields["Components"] = ""
    spell_fields["Range"] = ""
    spell_fields["Effect"] = ""
    spell_fields["Area"] = ""
    spell_fields["Duration"] = ""
    spell_fields["Saving Throw"] = ""
    spell_fields["Spell Resistance"] = ""
    spell_fields["Text"] = ""
    spell_soup = spell_soup.find("div", {"class": "body"})
    start = spell_soup.find("p", {"class": "stat-block-title", "id": spellname})
    if start:
        # Record spell name
        for string in start.stripped_strings:
            spell_fields["Name"].append(string)
        # iterate through spell entry
        for sibling in start.next_siblings:
            attrs = sibling.attrs
            attr_keys = list(attrs.keys())
            if sibling.name is 'p':
                if 'class' in attr_keys:
                    if attrs['class'] == 'stat-block-1':
                        # contains a spell field we need
                        for item in sibling.contents:
                    elif attrs['class'] == 'stat-block-title':
                        break # we've hit the next spell on this page
                else:
                    # this is the spell body
            elif sibling.name is 'div':
                break # this is the footer, or some other thing we don't want

    else:
        spell_fields["Name"] = spellname
        spell_fields["Text"] = "COULD NOT BE FOUND"
    spell_file.close()
    return spell_fields


def scrape_all():
    html_files = os.listdir(src_dir)
    all_spells = {}
    for file in html_files:
        all_spells[file] = get_spells(file)
    return all_spells


def scrape_core():
    html_files = glob.glob(src_dir + "_pathfinderRPG_prd_coreRulebook_spells_")
    core_spells = {}
    for file in html_files:
        spellname = file.split('#')[1]
        core_spells[spellname] = get_spells(file, spellname)
    return core_spells


