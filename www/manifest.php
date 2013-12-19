<?php 
    header('Content-type: text/cache-manifest'); 
    
    $hashes = "";
	$dados = "CACHE MANIFEST\n";
	$dados .= "#VersionHash: " . md5($hashes . time()) . "\n";
	
	
    
    function printFiles( $path = '.', $level = 0 ){ 
        global $hashes;
		global $dados;
        $ignore = array('.', '..','.htaccess','manifest.php', "ws", "manifest.manifest", "manifest_old", "misc", "autenticar.js", "instalar.html", "sincronizar.js", "jsonp.php", "reinstalar.html", "sincronizar.html", "autenticar.html", "manual_instalacao.txt");  
 
        $dh = @opendir( $path ); 
 
        while( false !== ( $file = readdir( $dh ) ) ){ 
            if( !in_array( $file, $ignore ) ){ 
                if( is_dir( "$path/$file" ) ){ 
                    printFiles( "$path/$file", ($level+1) ); 
                } else { 
                    $hashes .= md5_file("$path/$file");
					if(substr($path, 2))
					{
						$dados .= substr($path, 2) ."/".$file."\n";
					}
					else
					{
						$dados .= substr($path, 2) . $file."\n";
					}
                } 
            } 
        } 
 
        closedir( $dh ); 
    }
	
	printFiles('.');
	
	file_put_contents('./manifest.manifest', $dados);
	

?>