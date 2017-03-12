from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import os


# Just get the base classes from the core rulebook for now.
def get_links(url):
    try:
        html = urlopen(url)
    except HTTPError as e:
        print(e)
        return None
    links = []
    try:
        bs_obj = BeautifulSoup(html.read(), "html.parser")
        class_header = bs_obj.find("h1", {"id": "classes"})
        for sibling in class_header.next_siblings:
            if type(sibling) is type(class_header):
                if sibling.name == 'h1':
                    # we have hit the Character Advancement header. Stop.
                    break
                else:
                    if sibling.name == 'p':
                        link = sibling.find("a")
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
    page = BeautifulSoup(html.read(), "html.parser")
    directory = "base_class_sites/"
    fname = href.replace("/","_")
    path = directory + fname
    store = open(path,"w+")
    store.write(str(page))
    store.close()

index = "http://paizo.com/pathfinderRPG/prd/coreRulebook/show_collection.html"
all_links = get_links(index)
if all_links == None:
  print("links could not be found")
if not os.path.exists(os.path.dirname(os.path.abspath(__file__)) + '/base_class_sites/'):
    os.mkdir('base_class_sites')
else:
  for link in all_links:
    store_pages(link)
