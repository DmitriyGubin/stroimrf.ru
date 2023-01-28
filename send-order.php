<?php

$arResult = array('status' => false);

foreach ($_POST as $key => $value) 
{
    $_POST[$key] = trim($value);
}

$date = date_create();
//date_modify($date, '4 hour');
$date = date_format($date, 'd.m.Y H:i:s');

$to = 'testgubin@mail.ru';
$subject = 'Новая заявка на сайте от '.$date;

$args     = array(
	'Имя' => $_POST['name']??'',
	'Телефон' => $_POST['phone']??'',
	'Название коттеджа' => $_POST['house_name']??'',
	'Цена коттеджа' => $_POST['house_price']??'',
	'Название банка' => $_POST['bank_name']??'',
	'Страница отправки заявки' => $_SERVER['HTTP_REFERER']
	);

$body = '';
foreach ( $args as $key => $value ) 
{
	if ( ! empty( $value ) ) 
	{
		$body .= $key . ' : ' . $value . '.' . "\n";
	}
}

$headers = 'From: BauArtt-site@example.com';

if ( mail( $to, $subject, $body, $headers ) )
{
	$arResult['status'] = true;
}

echo json_encode($arResult);




