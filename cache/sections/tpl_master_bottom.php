<?php
if (!defined("IWP_CACHE_INCLUDED")) { die("Access denied"); }

if (!isset($output) || !is_array($output)) {
	$output = array(); 
}

$outputCounter = 0;

$output[] = iwp_content::getInstance()->DecodeSiteURLs(iwp_template::getInstance()->OutputBlock("customContent", 1, "bottom" , $outputCounter)); ++$outputCounter;
