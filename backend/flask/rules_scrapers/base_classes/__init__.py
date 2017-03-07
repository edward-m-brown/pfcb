import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import get_base_classes

core_classes = get_base_classes.scrape_base_classes()