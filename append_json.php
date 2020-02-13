<?php
$current_data = file_get_contents('js/products.json');
$array_data = json_decode($current_data);
$extra = array(
    'id' => $_POST['id'],
    'name' => $_POST['name'],
    'description' => $_POST["description"],
    'url' => $_POST["url"],
    'featured' => $_POST["featured"],
    'category' => $_POST["category"],
    'price' => $_POST["price"]
);
$array_data[] = $extra;
$final_data = json_encode($array_data, JSON_NUMERIC_CHECK);
file_put_contents('js/products.json', $final_data);

header("Location: http://gacikdesign.com/angularjs-shop/#!/admin");

?>