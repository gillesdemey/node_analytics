<?php
if (!defined("IWP_CACHE_INCLUDED")) { die("Access denied"); }

if (!isset($output) || !is_array($output)) {
	$output = array(); 
}

$outputCounter = 0;

$output[] = iwp_lists::getInstance()->OutputListById(11, "left", "static", null, $outputCounter); ++$outputCounter; // List Name: Praktisch en prijzen
$output[] = iwp_content::getInstance()->DecodeSiteURLs(iwp_template::getInstance()->OutputBlock("customImage", 7, "left" , $outputCounter)); ++$outputCounter;
$output[] = iwp_template::getInstance()->ParseSection("smallsearch_standard");  ++$outputCounter;
$output[] = iwp_content::getInstance()->DecodeSiteURLs(iwp_template::getInstance()->OutputBlock("customContent", 6, "left" , $outputCounter)); ++$outputCounter;
