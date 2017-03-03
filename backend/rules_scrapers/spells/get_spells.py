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

def get_spells(filename, spellname=None):
    # entries will end on stat-block-title or a <div class='footer'>
    spell_file = open(filename, "r+")
    try:
        spell_soup = BeautifulSoup(spell_file.read(), "html.parser")
    except AttributeError as e:
        print(e)
        return None
    spell_fields = {}
    spell_fields["Name"] = []
    spell_fields["Html"] = ""
    spell_soup = spell_soup.find("div", {"class": "body"})
    if spellname:
        start = spell_soup.find("p", {"class": "stat-block-title", "id": spellname})
    if (not spellname) or (not start):
        start = spell_soup.find("p", {"class": "stat-block-title"})
    if start:
        spell_fields["Html"] += str(start)
        # Record spell name
        for string in start.stripped_strings:
            spell_fields["Name"].append(string)
        spell_header = spell_soup.find_all("p", {"class": "stat-block-1"})
        for field in spell_header:
            key_tags = field.find_all('b')
            for key in key_tags:
                field_name = key.get_text()
                spell_fields[field_name] = []
                for sibling in key.next_siblings:
                    if type(sibling) is type(key): # this is a Tag
                        if sibling.name != 'b':
                            spell_fields[field_name].append(sibling.get_text())
                        else: break # if bold, this is another key and we should stop
                    else: # most likely just a NavigableString
                        spell_fields[field_name].append(sibling)
        # iterate through spell entry
        for sibling in start.next_siblings:
            if type(sibling) is type(start):
                attrs = sibling.attrs
                attr_keys = list(attrs.keys())
                has_class = 'class' in attr_keys
                is_footer = sibling.name == 'div' and has_class and attrs['class'] == ['footer']
                is_next_spell = sibling.name == 'p' and has_class and attrs['class'] == ['stat-block-title']
                if is_footer or is_next_spell:
                    break
                else:
                    spell_fields["Html"] += str(sibling)
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
    html_files = glob.glob(src_dir + "_pathfinderRPG_prd_coreRulebook_spells_*")
    core_spells = {}
    for filename in html_files:
        href_spellname = filename.split('#')
        if len(href_spellname) > 1:
            spellname = href_spellname[1]
            core_spells[spellname] = get_spells(filename, spellname)
        else:
            spellname = filename.split('_')[-1].split('.')[0]
            core_spells[spellname] = get_spells(filename)
    return core_spells


