<?php

if (isset($_POST["submit"])) {

    $target_dir = "../img/";
    $target_file = $target_dir . basename($_FILES["url"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    $check = getimagesize($_FILES["url"]["tmp_name"]);
    if ($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }

    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    } else {
        if (move_uploaded_file($_FILES["url"]["tmp_name"], $target_file)) {
            echo "The file " . basename($_FILES["url"]["name"]) . " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }

    $current_data = file_get_contents('../js/products.json');
    $array_data = json_decode($current_data); /* convert JSON string to PHP variable */
    
    /*$count = count($array_data);
    $lastId = $array_data[$count-1]->id; */
    
    $extra = array(
        /* 'id' => $lastId + 1, */
        'name' => $_POST['name'],
        'description' => $_POST["description"],
        'url' => 'img/' . basename($_FILES["url"]["name"]),
        'category' => $_POST["category"],
        'price' => $_POST["price"]
    );
    $array_data[] = $extra;

    /* usort($array_data, function ($a, $b) {
        return $a['id'] <=> $b['id'];
    }); */

    $final_data = json_encode($array_data, JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);

    file_put_contents('../js/products.json', $final_data);

    header("Location: /angularjs-shop/#!/admin");
}
