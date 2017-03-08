import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import get_spells

core_spells = get_spells.scrape_core_spells()