<?php
if (!defined("IWP_CACHE_INCLUDED")) { die("Access denied"); }

if (!isset($output) || !is_array($output)) {
	$output = array(); 
}

$outputCounter = 0;

$output[] = iwp_content::getInstance()->DecodeSiteURLs(iwp_template::getInstance()->OutputBlock("customImage", 8, "right" , $outputCounter)); ++$outputCounter;
$output[] = iwp_lists::getInstance()->OutputListById(13, "right", "dynamic", null, $outputCounter); ++$outputCounter; // List Name: LAST MINUTE BALLONVAART
$output[] = iwp_lists::getInstance()->OutputListById(9, "right", "dynamic", null, $outputCounter); ++$outputCounter; // List Name: Nieuws over de ballonvaart
$output[] = iwp_lists::getInstance()->OutputListById(2, "right", "dynamic", null, $outputCounter); ++$outputCounter; // List Name: Gastenboek over de ballonvlucht
$output[] = iwp_lists::getInstance()->OutputListById(14, "right", "dynamic", null, $outputCounter); ++$outputCounter; // List Name: All LAST MINUTES BALLONVAART
