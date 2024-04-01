import requests
from bs4 import BeautifulSoup

def extract_heading_50_content():
    url = "https://dizionaripiu.zanichelli.it/cultura-e-attualita/le-parole-del-giorno/parola-del-giorno/"
    response = requests.get(url)
    
    # Check if request was successful
    if response.status_code == 200:
        # Parse the webpage content
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find the content with the class 'heading-50'
        heading_50_content = soup.find_all(class_='heading-50')
        
        # Extract text from the content with 'heading-50' class
        if heading_50_content:
            for content in heading_50_content:
                content_text = content.get_text(separator='\n')
                #print(content_text.strip())
        else:
            print("Content with class 'heading-50' not found on the page.")
    else:
        print("Failed to fetch the webpage.")
    return content_text.strip()

a = extract_heading_50_content()
print(a)
