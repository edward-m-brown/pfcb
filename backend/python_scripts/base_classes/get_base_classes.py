from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re, ast, os, operator, glob

# Base Class Format:
# inside a <div class="body">
#   <h1 id=classname>Class Name</h1>
#   <p> Class summary description flavor stuff </p>
#   <p><b> Role: ... </b></p> <!-- not needed -->
#   <p><b> Alignment: ...
#   <p><b> Hit Die: ...
#   <h2>Class Skills</h2>
#   <p> The $CLASS_NAME's class skills are [skill list]
#   <p><b> Skill Ranks per Level</b>": $NUM
#   ... etc.
src_dir = "base_class_sites/"

def get_base_classes(filename, classname):
    # entries will end on stat-block-title or a <div class='footer'>
    base_class_file = open(filename, "r+")
    base_class_fields = {}
    base_class_fields["Name"] = []
    base_class_fields["Alignment"] = ""
    base_class_fields["HD"] = 0
    base_class_fields["Skills"] = []
    base_class_fields["Ranks"] = 0
    base_class_fields["Html"] = ""
    try:
        base_class_soup = BeautifulSoup(base_class_file.read(), "html.parser")
        base_class_soup = base_class_soup.find("div", {"class": "body"})
        header_block = base_class_soup.h1 # class name
        base_class_fields["Name"] = header_block.get_text()
        base_class_fields["Html"] += str(header_block)
        for sibling in header_block.next_siblings:
            if type(sibling) is type(header_block):
                if sibling.name == 'p'
                    if sibling.b: # one of many impo
                        b_text = sibling.b.get_text()
                        if b_text.search("Alignment") > -1:
                            alignment = str(sibling.b.next_sibling).strip(': .')
                            base_class_fields["Alignment"] = alignment
                        elif b_text.search("Hit Die") > -1:
                            hd = str(sibling.b.next_sibling).strip(': d.')
                            base_class_fields["HD"] = int(hd)


    except AttributeError as e:
        print("get_base_classes(" + filename + ") failed!\n" + e)
        return None
    else:
        return base_class_fields


def scrape_base_classes():
    html_files = glob.glob(src_dir + "classes_*")
    core_base_classes = {}
    for filename in html_files:
        base_classname = filename.split('#')[1]
        core_base_classes[base_classname] = get_base_classes(filename, base_classname)
    return core_base_classes


