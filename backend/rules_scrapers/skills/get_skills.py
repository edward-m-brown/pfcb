from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re, ast, os, operator, glob

# get the Skill info from local skill pages
# Skill Format:
# inside a <div class="body">
#   <h1>Skill Name</h1>
#   <h2> (ABS; Armor Check Penalty; Trained Only) </h2>
#   (<p><\p>)+ : rest of the description is either paragraphs or tables, until the footer

src_dir = "skill_sites/"

def get_skills(filename):
    # entries will end on stat-block-title or a <div class='footer'>
    skill_file = open(filename, "r+")
    skill_fields = {}
    skill_fields["Name"] = []
    skill_fields["Attribute"] = ""
    skill_fields["ACP"] = False
    skill_fields["TO"] = False
    skill_fields["Html"] = ""
    try:
        skill_soup = BeautifulSoup(skill_file.read(), "html.parser")
        skill_soup = skill_soup.find("div", {"class": "body"})
        start = skill_soup.h1
        skill_fields["Name"] = start.get_text()
        details = skill_soup.h2.get_text().strip('()').split(';')
        for field in details:
            if field in ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha']:
                skill_fields["Attribute"] = field
            elif field.find("Armor Check Penalty") > -1:
                skill_fields["ACP"] = True
            elif field.find("Trained Only") > -1:
                skill_fields["TO"] = True
        skill_fields["Html"] += str(start)
        for sibling in start.next_siblings:
            if type(sibling) is type(start):
                attrs = sibling.attrs
                attr_keys = list(sibling.attrs.keys())
                is_div = sibling.name == "div"
                has_class = 'class' in attr_keys
                if is_div and has_class and attrs['class'] == ['footer']:
                    break
                else:
                    skill_fields["Html"] += str(sibling)
    except AttributeError as e:
        print("get_skills(" + filename + ") failed!\n" + e)
        return None
    else:
        return skill_fields


def scrape_skills():
    html_files = glob.glob(src_dir + "skills_*")
    core_skills = {}
    for filename in html_files:
        skillname = filename.split('#')[1]
        core_skills[skillname] = get_skills(filename)
    return core_skills


