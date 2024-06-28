from selenium.webdriver.common.by import By
import time

def login(driver):
    # Logueandose
    urlMain = 'http://localhost:4200/'
    driver.get(urlMain)

    textUser = driver.find_element(By.XPATH, '/html/body/app-root/login-screen/div/div/div/div/div/div/div[2]/label[2]/input')
    textUser.send_keys('javierh')
    time.sleep(1)

    textPassword = driver.find_element(By.XPATH, '/html/body/app-root/login-screen/div/div/div/div/div/div/div[3]/label[2]/input')
    textPassword.send_keys('1234')
    time.sleep(1)

    btnLogin = driver.find_element(By.XPATH, '/html/body/app-root/login-screen/div/div/div/div/div/div/div[4]/button')
    btnLogin.click()
    time.sleep(1)
