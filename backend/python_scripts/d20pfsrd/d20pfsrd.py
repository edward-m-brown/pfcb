#modified to attempt to grab info from d20 pfsrd
from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re

feat_sites = set()
anchor_maps = dict()

#function to get the links from the feat index in the pathfinder srd
def getLinks(url):
  try:
    html = urlopen(url)
  except HTTPError as e:
    print(e)
    return None
  try:
    bsObj = BeautifulSoup(html.read())
    nav = bsObj.body.find_all("td", {"id":"sites-chrome-sidebar-left"})
  except AttributeError as e:
    print(e)
    return None
  #Try some clever shit
  try:
    in_nav= BeautifulSoup(str(nav))
    links = in_nav.find_all('a');
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
  #print(href_anchor[0])
  #print(href_anchor[1])
  feat_sites.add(href_anchor[0])
  if href_anchor[0] in anchor_maps:
    anchor_maps[href_anchor[0]].add(href_anchor[1])
  else:
    anchor_maps[href_anchor[0]] = set()
    anchor_maps[href_anchor[0]].add(href_anchor[1])

#get the feat info from feat links
#Might need to change this
def getFeat(href):
  href = str(href) 
  url = "http://paizo.com/"+ href 
  try:
    html = urlopen(url)
  except HTTPError as e:
    print(e)
    return None
  try:
    featSoup = BeautifulSoup(html.read())
  except AttributeError as e:
    print(e)
    return None
  return featSoup.h2

featInd = "http://www.d20pfsrd.com"
allFeatLinks = getLinks(featInd)
type(allFeatLinks)
if allFeatLinks== None:
  print("links could not be found")
else:
  i = 0
  for link in allFeatLinks:
    print(str(i) + " " + str(link))
    #href = link.get('href')
    #print("Splitting " + str(i) + ": " + href )
    #filterLink(href)
    i+=1
  #for site in feat_sites:
    #print("Href-part: " +site)
    #print("Associated anchors: " + str(anchor_maps[site]))

