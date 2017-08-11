<?php

	function merge_dir($in_dir, $prefix, $out_file) {
		$d = opendir($in_dir);
		while(($elem=readdir($d))!== false) {

			if( $elem == "." or $elem == "..")
				continue;
			if( is_dir("$in_dir/$elem") )
				merge_dir("$in_dir/$elem", "$prefix/$elem", $out_file);
			else {
				if( ftell($out_file) != 8 )
					fwrite($out_file, ",");
				$content = file_get_contents("$in_dir/$elem");
				fwrite($out_file, "\n\"$prefix/$elem\":$content"); 

			}
		}
	}

	function merge($in_dir, $out_file) {

		$file = fopen($out_file, "w");
		fwrite($file, "json = {");

		merge_dir($in_dir, "", $file);

		fwrite($file, "};");
		fclose($file);
	}

	$in_dir = "../json";
	$out_file = "all.json.js";

	merge($in_dir, $out_file);
	
?>
