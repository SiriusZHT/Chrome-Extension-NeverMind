# ！/usr/bin/env python
# -*- coding：utf-8 -*-
# author: haotian time:2019/10/
from PIL import Image
import cv2
import matplotlib.pyplot as plt


def sum_9_region_new(img, x, y):
    """
    9邻域框,以当前点为中心的田字框,黑点个数
    :param x:
    :param y:
    :return:
    """
    # 判断图片的长宽度下限
    cur_pixel = img.getpixel((x, y))  # 当前像素点的值
    width = img.width
    height = img.height

    if cur_pixel == 1:  # 如果当前点为白色区域,则不统计邻域值
        return 0

    if y == 0:  # 第一行
        if x == 0:  # 左上顶点,4邻域
            # 中心点旁边3个点
            sum = cur_pixel \
                  + img.getpixel((x, y + 1)) \
                  + img.getpixel((x + 1, y)) \
                  + img.getpixel((x + 1, y + 1))
            return 4 - sum
        elif x == width - 1:  # 右上顶点
            sum = cur_pixel \
                  + img.getpixel((x, y + 1)) \
                  + img.getpixel((x - 1, y)) \
                  + img.getpixel((x - 1, y + 1))

            return 4 - sum
        else:  # 最上非顶点,6邻域
            sum = img.getpixel((x - 1, y)) \
                  + img.getpixel((x - 1, y + 1)) \
                  + cur_pixel \
                  + img.getpixel((x, y + 1)) \
                  + img.getpixel((x + 1, y)) \
                  + img.getpixel((x + 1, y + 1))
            return 6 - sum
    elif y == height - 1:  # 最下面一行
        if x == 0:  # 左下顶点
            # 中心点旁边3个点
            sum = cur_pixel \
                  + img.getpixel((x + 1, y)) \
                  + img.getpixel((x + 1, y - 1)) \
                  + img.getpixel((x, y - 1))
            return 4 - sum
        elif x == width - 1:  # 右下顶点
            sum = cur_pixel \
                  + img.getpixel((x, y - 1)) \
                  + img.getpixel((x - 1, y)) \
                  + img.getpixel((x - 1, y - 1))

            return 4 - sum
        else:  # 最下非顶点,6邻域
            sum = cur_pixel \
                  + img.getpixel((x - 1, y)) \
                  + img.getpixel((x + 1, y)) \
                  + img.getpixel((x, y - 1)) \
                  + img.getpixel((x - 1, y - 1)) \
                  + img.getpixel((x + 1, y - 1))
            return 6 - sum
    else:  # y不在边界
        if x == 0:  # 左边非顶点
            sum = img.getpixel((x, y - 1)) \
                  + cur_pixel \
                  + img.getpixel((x, y + 1)) \
                  + img.getpixel((x + 1, y - 1)) \
                  + img.getpixel((x + 1, y)) \
                  + img.getpixel((x + 1, y + 1))

            return 6 - sum
        elif x == width - 1:  # 右边非顶点
            # print('%s,%s' % (x, y))
            sum = img.getpixel((x, y - 1)) \
                  + cur_pixel \
                  + img.getpixel((x, y + 1)) \
                  + img.getpixel((x - 1, y - 1)) \
                  + img.getpixel((x - 1, y)) \
                  + img.getpixel((x - 1, y + 1))

            return 6 - sum
        else:  # 具备9领域条件的
            sum = img.getpixel((x - 1, y - 1)) \
                  + img.getpixel((x - 1, y)) \
                  + img.getpixel((x - 1, y + 1)) \
                  + img.getpixel((x, y - 1)) \
                  + cur_pixel \
                  + img.getpixel((x, y + 1)) \
                  + img.getpixel((x + 1, y - 1)) \
                  + img.getpixel((x + 1, y)) \
                  + img.getpixel((x + 1, y + 1))
            return 9 - sum


def collect_noise_point(img, n):
    '''收集所有的噪点'''
    noise_point_list = []
    for x in range(img.width):
        for y in range(img.height):
            res_9 = sum_9_region_new(img, x, y)
            if (0 < res_9 < n) and img.getpixel((x, y)) == 0:  # 找到孤立点
                pos = (x, y)
                noise_point_list.append(pos)
    return noise_point_list


def remove_noise_pixel(img, noise_point_list):
    '''根据噪点的位置信息，消除二值图片的黑点噪声'''
    for item in noise_point_list:
        img.putpixel((item[0], item[1]), 1)


def get_bin_table(threshold):
    '''获取灰度转二值的映射table,0表示黑色,1表示白色'''
    table = []
    for i in range(256):
        if i < threshold:
            table.append(0)
        else:
            table.append(1)
    return table


def remake(guess_img, much_num, n, i):
    """
    guess_img:传入图片文件
    much_num: 阈值，控制二值化程度，自行调整（不能超过256）
    n：九宫格法去除像素点周围点的数量（推荐6和7）
    """

    imgry = guess_img.convert('L')
    table = get_bin_table(much_num)
    binary = imgry.point(table, '1')
    noise_point_list = collect_noise_point(binary, n)
    remove_noise_pixel(binary, noise_point_list)
    binary.save(i)


def ImgtoZeroOne(image, i):
    """
    image:传入处理识别图片
    i:第i个图片
    """
    image = image.resize((120, 50))  # 根据图片长宽改正，实验表明以原图大小处理后识别概率比较高
    remake(image, 235, 8, i)

    Image.open(i).save(i)
    image = Image.open(i)
    image = image.resize((120, 50))  # 根据图片长宽改正，实验表明以原图大小处理后识别概率比较高
    remake(image, 120, 6, i)
    Image.open(i)
    image = Image.open(i)
    image = image.resize((120, 50))  # 根据图片长宽改正，实验表明以原图大小处理后识别概率比较高
    remake(image, 100, 4, i)
    Image.open(i)
    image = Image.open(i)
    image = image.resize((120, 50))  # 根据图片长宽改正，实验表明以原图大小处理后识别概率比较高
    remake(image, 80, 2, i)
