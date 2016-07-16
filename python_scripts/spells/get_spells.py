from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re, ast, os, operator

#get the spell info from local spell pages
#Spell Format:
#in <div class="body">
  # 1.) <p class="stat-block-title">Spell Name
  #(the rest appear in <p class="stat-block-1"> elements)
  # 2.) School;Level (includes classes that have access)
  # 3.) Casting Time 
  # 4.) Components V, S, M, special) 
  # 5.) Range 
  # 6.) Area
  # 7.) Duration
  # 8.) Saving throw;Spell Resistance
  #(in last <p> sibling of .stat-block-title)
  # 9.) Spell description

def getSpells(filename):
  spell_file = open(rootDir+filename,"r+")
  try:
    spell_soup = BeautifulSoup(spell_file.read())
  except AttributeError as e:
    print(e)
    return None
  spell_fields = {}
  spell_fields["Name:"] = "" 
  spell_fields["School:"] = "" 
  spell_fields["Level:"] = "" 
  spell_fields["C_Time:"] = "" 
  spell_fields["Components:"] = "" 
  spell_fields["Range:"] = "" 
  spell_fields["Effect:"] = "" 
  spell_fields["Area:"] = "" 
  spell_fields["Duration:"] = "" 
  spell_fields["Saving Throw:"] = "" 
  spell_fields["Spell Resistance:"] = "" 
  spell_fields["Desc:"] = "" 
  #TODO: Change to Spell entry format.
  start = spell_soup.find(id=anchor)
  if start:
    #name is one string
    if start.string:
      spell_fields["Name:"].append(start.string.strip())
    else:
      #name is multiple strings
      for string in start.stripped_strings:
        spell_fields["Name:"].append(string)
    for sibling in start.next_siblings:
      #if the next element in the document is a tag
      if type(sibling) is type(start):
        #if a paragraph, it is information we want
        if sibling.name is 'p':
          #if not bold, it is either description or something to be 
          #added onto the spell body, probably in benefits
          #TODO: implement getting non-bold
          if not sibling.b and not sibling.strong:
            field = "Desc:"
            #single-line description
            if sibling.string:
              spell_fields[field].append(sibling.string.strip())
            else:
            #multi-line description. Most cases, probably actually a 
            #part of the Benefits section.
            #On studying Feat entries, it looks like standard Paizo format
            #is to keep descriptions to one line, so this section will 
            #almost never be a description.
            #Let's try throwing it into Misc.     
              field = "Misc:"
              for string in sibling.stripped_strings:
                spell_fields[field].append(string)
          #try grabbing strong tags.
          elif sibling.strong:
            if sibling.strong.string:
              #only one line in the given field; this is the key.
              field = sibling.strong.string.strip() 
              #use entry_title to filter 'Benefit' 'Special', etc. out.
              entry_title = field
            #need to make a list at field index to store stripped strings
            spell_fields[field] = []
            #go through the rest of the paragraph and get the info.
            for string in sibling.stripped_strings:
              if string != entry_title:
                spell_fields[field].append(string)
          else: 
            #this is a spell field: Benefit, Special, etc.
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
                spell_fields["Misc:"].append(string)
            #need to make a list at field index to store stripped strings
            spell_fields[field] = []
            #go through the rest of the paragraph and get the info.
            for string in sibling.stripped_strings:
              if string != entry_title:
                spell_fields[field].append(string)
        else:
          #if it's not a tag, we don't want to look at it
          break
      page_spells.append(spell_fields)
  spell_file.close()
  return page_spells

#int main()
rootDir = "spell_sites/"
html_files = os.listdir(rootDir)
all_spells = {} 
seed_output = open("seeds", "w+")
seed_output.write("[")

#NOTES: Should change regexes for spell subtypes to be universally
# compatible with any subtype
  #Just search for a '\('. If a spell has that, it has a subtype.
prereq = re.compile('\APre')
special = re.compile('\ASpe')
normal = re.compile('\ANor')
subtype= re.compile("\(")
for filename in html_files:
  all_spells[filename] = getFeats(filename)
  for spell_fields in all_spells[filename]:
    seed_output.write("{")
    for key in spell_fields:
      if key == "Name:": 
        seed_output.write("name: \"" + spell_fields[key] + "\",")
        if subtype.search(spell_fields[key]):
          spell_type = re.split('\(', spell_fields[key])
          spell_type[1] = spell_type[1].strip('\)')
          seed_output.write("subtype: \"" + spell_type[1] + "\",")
      elif key == "Desc:":
        seed_output.write("desc: \"" + spell_fields[key] + "\",")
      elif key == "Misc:":
        if spell_fields[key]:
          print("MISC:" + spell_fields[key])
      elif prereq.match(key): 
        seed_output.write("prereq: \"" + spell_fields[key] + "\",")
      elif benefit.match(key): 
        seed_output.write("benefit: \"" + spell_fields[key] + "\",")
      elif special.match(key): 
        seed_output.write("special: \"" + spell_fields[key] + "\",")
      else: 
        if normal.match(key): 
          seed_output.write("normal: \"" + spell_fields[key] + "\",")
    seed_output.write("}\n")
seed_output.write("]")
seed_output.close()
