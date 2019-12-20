from PIL import Image
import img_to_one_zero
import captcha_to_text


def gettext(ip, getbase64):
    file = open(ip + ".png", 'wb')
    file.write(getbase64)
    file.close()
    img = Image.open(ip + ".png")
    img_to_one_zero.ImgtoZeroOne(img, str(ip + ".png"))
    text = captcha_to_text.textpredict(ip + ".png")
    print(text)
    return text


def maketxt(ip, data):
    file = open(ip + ".txt", 'w')
    file.write(data)
    file.close()
    return "done"


def getpassword(ip):
    file = open(ip + "_password.txt", 'r')
    password = file.readline()
    return password;


def getusername(ip):
    file = open(ip + "_username.txt", 'r')
    password = file.readline()
    return password;
