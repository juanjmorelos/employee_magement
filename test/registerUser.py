from main import login
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

import time

driver = webdriver.Chrome()

def registerUser():
    login(driver)

    btnRegister = driver.find_element(By.XPATH, '/html/body/app-root/home-screen/div/div[2]/div/ul/li[3]/a')
    btnRegister.click()
    time.sleep(1)

    #name
    writeText('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[1]/div[1]/input', 'Juan David')
    
    #lastName
    writeText('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[1]/div[2]/input', 'Hernandez Diaz')

    #email
    writeText('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[2]/div[1]/input', 'jhndez@yopmail.com')

    #privilegies
    selectOption('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[2]/div[2]/select', 2)

    #position
    selectOption('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[3]/div[1]/select', 5)

    #salario
    writeText('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[3]/div[2]/input', '4500000')

    #fecha de nacimiento
    writeText('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[4]/div[1]/input', '21-10-1990')

    #identificacion
    writeText('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[4]/div[2]/input', '1066789130')
    
    #pension
    selectOption('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[5]/div[1]/select', 1)
    
    #arl
    selectOption('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[5]/div[2]/select', 2)
    
    #seguro
    selectOption('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[6]/div[1]/select', 4)
    
    #cesantías
    selectOption('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[6]/div[2]/select', 1)

    #usuario
    writeText('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[7]/div[1]/input', 'jhndez')

    #contraseña
    writeText('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[7]/div[2]/input', '1234')

    #contraseña
    writeText('/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[8]/div/input', '8233456435')

    btnRegisterUser = driver.find_element(By.XPATH, '/html/body/app-root/home-screen/div/div[1]/app-employee-register/div[1]/div/div[2]/div[9]/button')
    btnRegisterUser.click()
    time.sleep(5)

    #Se va a la opción para ver todos los usuarios registrados
    btnGoToViewUsers = driver.find_element(By.XPATH, '/html/body/app-root/home-screen/div/div[2]/div/ul/li[2]/a')
    btnGoToViewUsers.click()
    time.sleep(1)

    #miramos al usuario nuevo
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(5)

def selectOption(xpath, option):
    select = driver.find_element(By.XPATH, xpath)
    select = Select(select)
    select.select_by_index(option)
    time.sleep(1)

def writeText(xpath, text):
    textInput = driver.find_element(By.XPATH, xpath)
    textInput.send_keys(text)
    time.sleep(1)

registerUser()