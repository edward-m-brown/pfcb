from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re

feat_sites = set()
anchor_maps = dict()
type(anchor_maps)

#function to get the links from the feat index in the pathfinder srd
def getLinks(url):
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
def filterLink(href):
  link = str(href)
  href_anchor = re.split('#',link)
  feat_sites.add(href_anchor[0])
  if href_anchor[0] in anchor_maps:
    anchor_maps[href_anchor[0]].add(href_anchor[1])
  else:
    anchor_maps[href_anchor[0]] = set()
    anchor_maps[href_anchor[0]].add(href_anchor[1])

def storeFeatPages(href):
  href = str(href) 
  url = "http://paizo.com/"+ href 
  try:
    html = urlopen(url)
  except HTTPError as e:
    print(e)
    return None
  page = BeautifulSoup(html.read())
  directory = "feat_sites/"
  href = href.replace("/","_")
  path = directory+href
  store = open(path,"w+")
  store.write(page.prettify())
  store.close()

#int main()
featInd = "http://paizo.com/pathfinderRPG/prd/indices/feats.html"
allFeatLinks = getLinks(featInd)
if allFeatLinks== None:
  print("links could not be found")
else:
  for link in allFeatLinks:
    href = link.get('href')
    filterLink(href)
  for key in anchor_maps:
    anchor_maps[key] = sorted(anchor_maps[key])
  anchor_file = open("anchor_map","w+")
  anchor_file.write(str(anchor_maps))
  anchor_file.close()
  while len(feat_sites):
    href = feat_sites.pop()

    storeFeatPages(href)
