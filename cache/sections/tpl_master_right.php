<?php
if (!defined("IWP_CACHE_INCLUDED")) { die("Access denied"); }

if (!isset($output) || !is_array($output)) {
	$output = array(); 
}

$outputCounter = 0;

$output[] = iwp_template::getInstance()->ParseSection("rsslink_standard");  ++$outputCounter;
$output[] = iwp_lists::getInstance()->OutputListById(2, "right", "dynamic", null, $outputCounter); ++$outputCounter; // List Name: Gastenboek over de ballonvlucht
$output[] = iwp_lists::getInstance()->OutputListById(13, "right", "dynamic", null, $outputCounter); ++$outputCounter; // List Name: LAST MINUTE BALLONVAART
$output[] = iwp_lists::getInstance()->OutputListById(14, "right", "dynamic", null, $outputCounter); ++$outputCounter; // List Name: All LAST MINUTES BALLONVAART
