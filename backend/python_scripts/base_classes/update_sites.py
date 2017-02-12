from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re


# function to get the links from the feat index in the pathfinder srd
def get_links(url):
    try:
        html = urlopen(url)
    except HTTPError as e:
        print(e)
        return None
    skill_index = open("skill_sites/_pathfinderRPG_prd_coreRulebook_skillDescriptions.html", "w+")
    links = []
    try:
        bs_obj = BeautifulSoup(html.read(), "html.parser")
        skill_rows = bs_obj.find_all("tr")
        for row in skill_rows:
            td = row.find("td")
            if td:
                link = td.find("a")
                if link != -1 and link is not None:
                    links.append(link.get('href'))
    except AttributeError as e:
        print(e)
        return None
    return links


def store_pages(href):
    href = str(href)
    url = "http://paizo.com/pathfinderRPG/prd/coreRulebook/" + href
    try:
        html = urlopen(url)
    except HTTPError as e:
        print(e)
        return None
    page = BeautifulSoup(html.read())
    directory = "skill_sites/"
    fname = href.replace("/","_")
    path = directory + fname
    store = open(path,"w+")
    store.write(str(page))
    store.close()

index = "http://paizo.com/pathfinderRPG/prd/coreRulebook/skillDescriptions.html"
all_links = get_links(index)
if all_links == None:
  print("links could not be found")
else:
  for link in all_links:
    store_pages(link)
