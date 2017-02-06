from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re

featSites = set()
anchorMaps = dict()
# type(anchorMaps)


def get_links(url):
    """
    Function to get the links from the feat index in the prd

    :param url: String path to the desired prd page.
    :type url: str

    :returns:
    :rtype:
    """
    try:
        html = urlopen(url)
        soup = BeautifulSoup(html.read(), "html.parser")
        table = soup.find("table", {"id": "feats-index-table"})
        in_table = BeautifulSoup(str(table), "html.parser")
        rows = in_table.find_all("tr")
        in_rows = BeautifulSoup(str(rows), "html.parser")
        links = []
        for row in in_rows:
            link = row.find("a")
            if link != -1 and link is not None:
                links.append(link)
    except AttributeError as e:
        print(e)
        return None
    if len(links) == 0:
        links = None
    # try returning links in table
    return links


# function to split anchors off of links.
# should also put link into set, and associate link to a
# list of anchors via a dictionary object
def filter_link(href):
    link = str(href)
    href_anchor = re.split('#', link)
    featSites.add(href_anchor[0])
    if href_anchor[0] in anchorMaps:
        try:
            anchorMaps[href_anchor[0]].add(href_anchor[1])
        except:
            pass
    else:
        anchorMaps[href_anchor[0]] = set()
        try:
            anchorMaps[href_anchor[0]].add(href_anchor[1])
        except:
            pass


def store_feat_pages(href):
    href = str(href)
    url = "http://paizo.com/" + href
    try:
        html = urlopen(url)
    except HTTPError as e:
        print(e)
        return None
    page = BeautifulSoup(html.read(), "html.parser")
    directory = "feat_sites/"
    href = href.replace("/", "_")
    path = directory + href
    outfile = open(path,"w+")
    outfile.write(page.prettify())
    outfile.close()


# int main()
featInd = "http://paizo.com/pathfinderRPG/prd/indices/feats.html"
allFeatLinks = get_links(featInd)
if allFeatLinks is None:
    print("links could not be found")
else:
    for featLink in allFeatLinks:
        feat_href = featLink.get('href')
        filter_link(feat_href)

for key in anchorMaps:
    anchorMaps[key] = sorted(anchorMaps[key])

anchorFile = open("anchor_map", "w+")
anchorFile.write(str(anchorMaps))
anchorFile.close()
while len(featSites) != 0:
    featSite = featSites.pop()
    store_feat_pages(featSite)
