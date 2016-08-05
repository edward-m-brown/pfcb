#For prd spells index. Might not want to use the same approach as feats, as each spell has a separate page.

from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re

sites = set()

#function to get the links from the feat index in the pathfinder srd
def getLinks(url):
  print("getLinks("+url+")")
  try:
    html = urlopen(url)
  except HTTPError as e:
    print(e)
    return None
  try:
    bsObj = BeautifulSoup(html.read())
    div = bsObj.body.find_all("div", {"id":"spell-index-wrapper"})
  except AttributeError as e:
    print(e)
    return None
  try:
    in_div = BeautifulSoup(str(div))
    links = in_div.find_all('a');
  except AttributeError as e:
    print(e)
    return None
  #try returning links in div
  return links

#function to split anchors off of links.
#should also put link into set, and associate link to a 
# list of anchors via a dictionary object
""" DON'T NEED FOR SPELLS
def filterLink(href):
  link = str(href)
  print("link: " + href)
  href_anchor = re.split('#',link)
  sites.add(href_anchor[0])
  if href_anchor[0] in anchor_maps:
    anchor_maps[href_anchor[0]].add(href_anchor[1])
  else:
    anchor_maps[href_anchor[0]] = set()
    anchor_maps[href_anchor[0]].add(href_anchor[1])
"""
def storePages(href):
  print("storePages("+href+")")
  href = str(href) 
  url = "http://paizo.com/"+ href 
  try:
    html = urlopen(url)
  except HTTPError as e:
    print(e)
    return None
  page = BeautifulSoup(html.read())
  directory = "spell_sites/"
  href = href.replace("/","_")
  path = directory+href
  store = open(path,"w+")
  store.write(page.prettify())
  store.close()

#int main()
index = "http://paizo.com/pathfinderRPG/prd/indices/spells.html"
allLinks = getLinks(index)
if allLinks== None:
  print("links could not be found")
else:
  for link in allLinks:
    href = link.get('href')
    storePages(href)
"""
DONT NEED FOR SPELLS
  for key in anchor_maps:
    anchor_maps[key] = sorted(anchor_maps[key])
  anchor_file = open("anchor_map","w+")
  anchor_file.write(str(anchor_maps))
  anchor_file.close()
"""

