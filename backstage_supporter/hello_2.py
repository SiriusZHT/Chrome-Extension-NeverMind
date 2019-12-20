from flask import Flask, request
import base64
import filemaker

app = Flask(__name__)  # 鍒涘缓涓�涓湇鍔★紝璧嬪�肩粰APP


@app.route('/', methods=['get', 'post'])  # 鎸囧畾鎺ュ彛璁块棶鐨勮矾寰勶紝鏀寔浠�涔堣姹傛柟寮廹et锛宲ost
def wait():
    # return 'Sorry!\nPlease upload your tobase64ed captcha string = =#'
    return '请在此页面点击插件设置账号密码嗷！（提示：账号密码填写错误会使登陆时页面崩溃！这时请关闭页面重新登陆！）==============================》'
# @app.route('/linxiao', methods=['get', 'post'])  # 鎸囧畾鎺ュ彛璁块棶鐨勮矾寰勶紝鏀寔浠�涔堣姹傛柟寮廹et锛宲ost
# def linxiao():
#     return 'Hello XiaoLin bro!'


@app.route('/sendbase64', methods=['get', 'post'])  # 鎸囧畾鎺ュ彛璁块棶鐨勮矾寰勶紝鏀寔浠�涔堣姹傛柟寮廹et锛宲ost
def response():
    url = str(request.get_data())[1:]
    print(url)
    if url:
        ip = str(request.remote_addr)
        try:
            getbase64 = base64.b64decode(url)
        except:
            return url
        text = filemaker.gettext(ip, getbase64)
        print(text)
        return text
    else:
        return "NULL"


@app.route('/sendusername', methods=['get', 'post'])
def sendusername():
    username = str(request.get_data())[1:]
    print(username)
    if username:
        ip = str(request.remote_addr)
        us = filemaker.maketxt(ip + "_username", username)
        print("us:" + us)
        return "us:" + us
    else:
        return "NULL"

@app.route('/sendpassword', methods=['get', 'post'])
def sendpassword():
    password = str(request.get_data())[1:]
    print(password)
    if password:
        ip = str(request.remote_addr)
        pw = filemaker.maketxt(ip + "_password", password)
        print("pw:" + pw)
        return "pw:" + pw
    else:
        return "NULL"

@app.route('/getpassword', methods=['get', 'post'])
def getpassword():
    ip = str(request.remote_addr)
    if ip:
        password = filemaker.getpassword(ip)[1:-1]
        print("password" + password)
        return password
    else:
        return "NULL"


@app.route('/getusername', methods=['get', 'post'])
def getusername():
    ip = str(request.remote_addr)
    if ip:
        username = filemaker.getusername(ip)[1:-1]
        print("username" + username)
        return username
    else:
        return "NULL"

@app.route('/zht',methods=['get','post'])
def zht():
	return 'Hello I am SiriusZHT!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1111)
