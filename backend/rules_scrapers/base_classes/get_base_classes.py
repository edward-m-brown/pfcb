from bs4 import BeautifulSoup, element
import re, os, glob, traceback

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


def get_base_classes(filename, classname):
    # entries will end on stat-block-title or a <div class='footer'>
    with open(filename, encoding='utf-8') as base_class_file:
        base_class_soup = BeautifulSoup(base_class_file.read(), "html.parser")
    base_class_fields = {}
    base_class_fields["Name"] = []
    base_class_fields["Alignment"] = ""
    base_class_fields["HD"] = 0
    base_class_fields["Skills"] = []
    base_class_fields["Ranks"] = 0
    base_class_fields["Html"] = ""
    try:
        base_class_body = base_class_soup.find("div", {"class": "body"})
        tables = base_class_soup.find_all('table')
        header_block = base_class_body.h1 # class name
        base_class_fields["Name"] = header_block.get_text()
        base_class_fields["Html"] += str(header_block)
        for sibling in header_block.next_siblings:
            if type(sibling) is element.Tag:
                if sibling.name == 'p':
                    if sibling.b:
                        b_text = sibling.b.get_text()
                        if b_text.find("Alignment") > -1:
                            alignment = str(sibling.b.next_sibling).strip(': .')
                            base_class_fields["Alignment"] = alignment
                        elif b_text.find("Hit Die") > -1:
                            hd = str(sibling.b.next_sibling).strip(': d.')
                            base_class_fields["HD"] = int(hd)
                        elif b_text.find("Skill Ranks per") > -1:
                            ranks = str(sibling.b.next_sibling).strip(': +')
                            base_class_fields["Ranks"] = int(ranks)
                    else:
                        p_text = sibling.get_text()
                        if p_text.find("class skills are") > -1: # class skill list
                            class_skills = p_text.split("class skills are")[1].split(",")
                            for skill in class_skills:
                                if re.search(r"\band\b", skill):
                                    skill = re.sub(r"\band\b", '', skill)
                                sk_name = skill.split('(')
                                if len(sk_name) > 2: # this skill has a subtype
                                    sk_name = sk_name[0] + "(" + sk_name[1]
                                else:
                                    sk_name = sk_name[0]
                                sk_name = sk_name.strip(' ')
                                base_class_fields["Skills"].append(sk_name)
                elif sibling.name == 'div' and sibling.has_attr('id') and sibling['id'] == 'footer':
                    break # done
        for table in tables: # advancement table or class feature
            if table.caption:
                caption = table.caption.get_text()
                has_classname = caption.find("Table: " + base_class_fields["Name"]) > -1
                is_spells_known = caption.find("Spells Known") > -1
                if has_classname and not is_spells_known: # adv. table
                    process_class_table(table, base_class_fields, base_class_soup)
    except AttributeError as e:
        print("get_base_classes(" + filename + ") failed!")
        print (e)
        traceback.print_exc()
        return None
    else:
        return base_class_fields


def process_class_table(table, class_dict, soup):
    class_dict["Levels"] = []
    try:
        head = table.find('thead')
        head_rows = head.find_all('tr')
        header_fields = []
        spell_level_fields = None
        for header in head_rows[0].find_all('th'):
            header_fields.append(header.get_text())
        if len(head_rows) > 1: # class has spells per day
            spell_level_fields = []
            for col_header in head_rows[1].find_all('th'):
                spell_level_fields.append(col_header.get_text())
            header_fields.extend(spell_level_fields)
        level_rows = table.find_all('tr')
        # print("HEAD ROWS:" + repr(header_fields))
        for level_row in (level_rows[0], level_rows[1]): # get rid of header rows
            if level_row.find('th'):
                level_rows.remove(level_row)
        for level_row in level_rows:
            level = {}
            level["SPD"] = {}
            level_data = level_row.find_all('td')
            # print(repr(level_data))
            index = 0
            for data in level_data:
                text = data.get_text()
                print(text)
                print(index)
                key = header_fields[index]
                index += 1
                print(key)
                if key == "Level":
                    continue
                if key == "Spells per Day":
                    key = header_fields[index]
                    index += 1
                if key == "Base Attack Bonus":
                    level["BAB"] = int(text.split('/')[0].strip('+'))
                elif key == "Fort Save":
                    level["Fort"] = int(text.strip('+'))
                elif key == "Ref Save":
                    level["Ref"] = int(text.strip('+'))
                elif key == "Will Save":
                    level["Will"] = int(text.strip('+'))
                elif key == "Special":
                    level["Abilities"] = []
                    level["Features"] = []
                    for child in data.children:
                        if type(child) is element.Tag: # only look at tags
                            if child.name == 'a':
                                special_soup = soup.find('p', {"id": child['href'].strip('#')})
                                print(repr(special_soup))
                                if special_soup:
                                    if special_soup.b:
                                        special_name = special_soup.b.get_text()
                                    elif special_soup.i:
                                        special_name = special_soup.i.get_text()
                                    else:
                                        print('not italic or bold: ' + class_dict["Name"] )
                                    ability_type = special_name.split('(')
                                    if len(ability_type) > 1:
                                        ability = {}
                                        ability["Name"] = ability_type[0].strip(' ')
                                        ability["Type"] = ability_type[1].strip(') ')
                                        sib = child.next_sibling
                                        if sib and type(sib) is element.NavigableString:
                                            magnitude = sib.string.strip(' ')
                                            if magnitude not in [',']:
                                                ability["Magnitude"] = magnitude
                                        level["Abilities"].append(ability)
                                    else:
                                        level["Features"].append(child.get_text().strip(' ')) # want to add a reference here too...
                                else:
                                    print("p tag could not be found for " + str(child))
                        else:
                            continue
                elif spell_level_fields and key in spell_level_fields:
                    level["SPD"][key] = data.get_text()
            class_dict["Levels"].append(level)
    except AttributeError as e:
        print("process_class_table(" + class_dict["Name"] + ") failed!")
        print (e)
        traceback.print_exc()
        # return table, soup


def scrape_base_classes():
    html_dir = os.path.dirname(os.path.abspath(__file__)) + "/base_class_sites/*"
    html_files = glob.glob(html_dir)
    core_base_classes = {}
    for filename in html_files:
        base_classname = filename.split('#')[1]
        core_base_classes[base_classname] = get_base_classes(filename, base_classname)
    core_base_classes["cleric"]["Alignment"] = "Within one step of chosen Deity"
    return core_base_classes


