# test_file1.py
from selenium import webdriver
from main import login
import time

driver = webdriver.Chrome()
login(driver)
time.sleep(5)