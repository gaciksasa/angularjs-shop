<?php

if (isset($_POST["submit"])) {

    if (($_FILES["url"]["name"])) {
        $target_dir = "img/";
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
    } else {
        $target_file = $_POST['current_url'];
    }

    $current_data = file_get_contents('../js/products.json');
    $array_data = json_decode($current_data);

    if (isset($_POST["id"])) {
        $id = $_POST["id"];
    } else {
        $count = count($array_data);
        $id = ($array_data[$count - 1]->id) + 1;
    }

    if ($_POST["featured"] == 'on') {
        $featured = true;
    } else {
        $featured = false;
    };

    if ($_POST["disabled"] == 'true') {
        $disabled = true;
    } else {
        $disabled = false;
    };

    $extra = array(
        'id' => $id,
        'name' => $_POST['name'],
        'description' => $_POST["description"],
        'url' => $target_file,
        'featured' => $featured,
        'category' => $_POST["category"],
        'price' => $_POST["price"],
        'disabled' => $disabled
    );

    if (isset($_POST["id"])) {
        $array_data[$id - 1] = $extra;
    } else {
        $array_data[] = $extra;
    }

    /* usort($array_data, function ($a, $b) {
        return $a['id'] <=> $b['id'];
    }); */

    $final_data = json_encode($array_data, JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);

    file_put_contents('../js/products.json', $final_data);

    header("Location: /angularjs-shop/#!/admin");
}
