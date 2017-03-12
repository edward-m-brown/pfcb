import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import get_feats

core_feats = get_feats.scrape_core_feats()
# all_feats = get_feats.scrape_all_feats()