from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re, ast, os, operator

anchor_file = open("anchor_map", "r+")
anchor_maps = anchor_file.read()
anchor_maps = ast.literal_eval(anchor_maps)
anchor_file.close()

# need this in getFeats
benefit = re.compile('\ABen')
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
    feat_file = open(rootDir + fname, "r+")
    try:
        feat_soup = BeautifulSoup(feat_file.read())
    except AttributeError as e:
        print(e)
        return None
    #TODO
    page_feats= []
    for anchor in anchors:
        feat_fields = {}
        feat_fields["Name:"] = []
        feat_fields["Desc:"] = []
        feat_fields["Misc:"] = []
        start = feat_soup.find(id=anchor)
        if start:
          # name is one string
          if start.string:
            feat_fields["Name:"].append(start.string.strip())
          else:
            #name is multiple strings
            for string in start.stripped_strings:
              feat_fields["Name:"].append(string)
          for sibling in start.next_siblings:
            #if the next element in the document is a tag
            if type(sibling) is type(start):
              #if a paragraph, it is information we want
              if sibling.name is 'p':
                #if not bold, it is either description or something to be
                #added onto the feat body, probably in benefits
                #TODO: implement getting non-bold
                if not sibling.b and not sibling.strong:
                  field = "Desc:"
                  #single-line description
                  if sibling.string:
                    feat_fields[field].append(sibling.string.strip())
                  else:
                  #multi-line description. Most cases, probably actually a
                  #part of the Benefits section.
                  #On studying Feat entries, it looks like standard Paizo format
                  #is to keep descriptions to one line, so this section will
                  #almost never be a description.
                  #Let's try throwing it into Misc.
                    field = "Misc:"
                    for string in sibling.stripped_strings:
                      feat_fields[field].append(string)
                #try grabbing strong tags.
                elif sibling.strong:
                  if sibling.strong.string:
                    #only one line in the given field; this is the key.
                    field = sibling.strong.string.strip()
                    #use entry_title to filter 'Benefit' 'Special', etc. out.
                    entry_title = field
                  #need to make a list at field index to store stripped strings
                  feat_fields[field] = []
                  #go through the rest of the paragraph and get the info.
                  for string in sibling.stripped_strings:
                    if string != entry_title:
                      feat_fields[field].append(string)
                else:
                  #this is a feat field: Benefit, Special, etc.
                  #The bold part is the name of the key.
                  #TODO: one page has these in a Strong tag. Change to get those
                  if sibling.b.string:
                    #only one line in the given field; this is the key.
                    field = sibling.b.string.strip()
                    #use entry_title to filter 'Benefit' 'Special', etc. out.
                    entry_title = field
                  #Following case NEVER HAPPENS. But, I am not taking data from
                  #all pages just yet, so I'll keep it here in case I need it.

                  else:
                    #this is some other thing or weird edge case. Throw it to Misc.
                    for string in sibling.b.stripped_strings:
                      #might never get here. Test it.
                      feat_fields["Misc:"].append(string)
                  #need to make a list at field index to store stripped strings
                  feat_fields[field] = []
                  #go through the rest of the paragraph and get the info.
                  for string in sibling.stripped_strings:
                    if string != entry_title:
                      feat_fields[field].append(string)
              else:
                #if it's not a tag, we don't want to look at it
                break
          for key in feat_fields:
            #contacenate the list of strings at each entry.
            feat_fields[key] = " ".join(feat_fields[key])


            #TODO: filter out "[stuff]", replace with '[stuff]'
          page_feats.append(feat_fields)
        feat_file.close()
        return page_feats

#int main()
rootDir = "feat_sites/"
html_files = os.listdir(rootDir)
all_feats = {} 
seed_output = open("seeds", "w+")
seed_output.write("[")

#NOTES: Should change regexes for feat subtypes to be universally
# compatible with any subtype
  #Just search for a '\('. If a feat has that, it has a subtype.
prereq = re.compile('\APre')
special = re.compile('\ASpe')
normal = re.compile('\ANor')
subtype= re.compile("\(")
for filename in html_files:
  all_feats[filename] = get_feats(filename)
  for feat_fields in all_feats[filename]:
    seed_output.write("{")
    for key in feat_fields:
      if key == "Name:": 
        seed_output.write("name: \"" + feat_fields[key] + "\",")
        if subtype.search(feat_fields[key]):
          feat_type = re.split('\(', feat_fields[key])
          feat_type[1] = feat_type[1].strip('\)')
          seed_output.write("subtype: \"" + feat_type[1] + "\",")
      elif key == "Desc:":
        seed_output.write("desc: \"" + feat_fields[key] + "\",")
      elif key == "Misc:":
        if feat_fields[key]:
          print("MISC:" + feat_fields[key])
      elif prereq.match(key): 
        seed_output.write("prereq: \"" + feat_fields[key] + "\",")
      elif benefit.match(key): 
        seed_output.write("benefit: \"" + feat_fields[key] + "\",")
      elif special.match(key): 
        seed_output.write("special: \"" + feat_fields[key] + "\",")
      else: 
        if normal.match(key): 
          seed_output.write("normal: \"" + feat_fields[key] + "\",")
    seed_output.write("}\n")
seed_output.write("]")
seed_output.close()
