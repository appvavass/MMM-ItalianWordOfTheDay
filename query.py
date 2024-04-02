import requests
from lxml import html
import json

def extract_heading_50_content():
    url = "https://dizionaripiu.zanichelli.it/cultura-e-attualita/le-parole-del-giorno/parola-del-giorno/"
    response = requests.get(url)
    
    # Check if request was successful
    if response.status_code == 200:
        # Parse the HTML content
        tree = html.fromstring(response.content)
        
        # Find the content with the class 'heading-50'
        heading_50_content = tree.xpath('//h1[@class="heading-50"]')
        
        # Extract text from the content with 'heading-50' class
        if heading_50_content:
            content_text = "\n".join(content.text.strip() for content in heading_50_content)
        else:
            print("Content with class 'heading-50' not found on the page.")
            return None
    else:
        print("Failed to fetch the webpage.")
        return None

    return json.dumps({"word": content_text.strip()})
