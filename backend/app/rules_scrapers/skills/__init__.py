import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import get_skills

core_skills = get_skills.scrape_skills()