from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
from utils import categoryConverter

def homecenterScrapper():

    service = Service(executable_path='/Users/eduardoblandon/Desktop/doio/doioScrappers/chromedriver')
    driver = webdriver.Chrome(service=service)
    products = []

    for pageIndex in range(2):

        driver.get(f'https://www.homecenter.com.co/homecenter-co/category/cat7330024/zona-de-ahorro/?cid=btnhom1008670&currentpage={pageIndex + 1}')
        driver.maximize_window()
        driver.refresh()

        y = 1000
        for timer in range(0,25):
            driver.execute_script("window.scrollTo(0, "+str(y)+")")
            y += 1000  
            time.sleep(1)
        
        for product in range(28):
            try:
                if int(driver.find_element(By.XPATH, f'/html/body/div[1]/div/div/div[7]/div[3]/div[1]/div[1]/div[3]/div[{1 + product}]/div/div[6]/div/div[3]/div').text[1:-1]) > 49:
                    products.append({
                        'title': driver.find_element(By.XPATH, f'/html/body/div[1]/div/div/div[7]/div[3]/div[1]/div[1]/div[3]/div[{1 + product}]/div/div[4]/a/h2').text,
                        'discount': driver.find_element(By.XPATH, f'/html/body/div[1]/div/div/div[7]/div[3]/div[1]/div[1]/div[3]/div[{1 + product}]/div/div[6]/div/div[3]/div').text[1:-1],
                        'link': driver.find_element(By.XPATH, f'/html/body/div[1]/div/div/div[7]/div[3]/div[1]/div[1]/div[3]/div[{1 + product}]/div/div[4]/a').get_attribute('href'),
                        'provider': 'Homecenter',
                        'featured': 0,
                        'category': categoryConverter(driver.find_element(By.XPATH, f'/html/body/div[1]/div/div/div[7]/div[3]/div[1]/div[1]/div[3]/div[{1 + product}]/div/div[4]/a/h2').text.split()[0]),
                        'imageLink': driver.find_element(By.XPATH, f'/html/body/div[1]/div/div/div[7]/div[3]/div[1]/div[1]/div[3]/div[{1 + product}]/div/div[2]/a/div[2]/div/img').get_attribute('src').replace('200', '700')
                    })
            except: pass
    
    driver.quit()

    return products