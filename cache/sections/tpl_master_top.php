<?php
if (!defined("IWP_CACHE_INCLUDED")) { die("Access denied"); }

if (!isset($output) || !is_array($output)) {
	$output = array(); 
}

$outputCounter = 0;

$output[] = iwp_lists::getInstance()->OutputListById(12, "top", "static", null, $outputCounter); ++$outputCounter; // List Name: Top nav
