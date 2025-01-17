<?php

// 判断当前设备是否为移动设备的函数
function is_mobile() {
    $user_agent = $_SERVER['HTTP_USER_AGENT']; // 获取用户代理字符串
    $mobile_agents = array('Android', 'iPhone', 'Windows Phone', 'BlackBerry', 'SymbianOS'); // 定义移动设备关键词数组

    // 遍历移动设备关键词数组，检查用户代理字符串中是否包含这些关键词
    foreach ($mobile_agents as $mobile_agent) {
        if (stripos($user_agent, $mobile_agent) !== false) {
            return true; // 如果找到关键词，返回true表示是移动设备
        }
    }
    return false; // 如果没有找到关键词，返回false表示不是移动设备
}

// 从指定的txt文件中随机获取一条图片链接的函数
function get_random_image($filename) {
    $image_urls = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES); // 读取txt文件的每一行，存储到一个数组中
    if (count($image_urls) > 0) {
        $random_index = array_rand($image_urls); // 从数组中随机选择一个索引
        return $image_urls[$random_index]; // 返回选中的图片链接
    } else {
        return false; // 如果数组为空，返回false表示没有图片链接
    }
}

// 直接输出图片的函数
function output_image($image_url) {
    $headers = get_headers($image_url, 1); // 获取图片链接的HTTP头信息
    if (isset($headers['Content-Type'])) {
        header('Content-Type: ' . $headers['Content-Type']); // 设置响应的Content-Type头部信息
    }
    echo file_get_contents($image_url); // 读取并输出图片内容
}

$is_mobile = is_mobile(); // 判断当前设备是否为移动设备
$filename = $is_mobile ? 'miu.txt' : 'piu.txt'; // 根据设备类型选择相应的txt文件
$image_url = get_random_image($filename); // 从txt文件中随机获取一条图片链接

if ($image_url) {
    output_image($image_url); // 输出图片
} else {
    echo "No images found in the txt file."; // 如果没有图片链接，输出错误信息
}

?>
