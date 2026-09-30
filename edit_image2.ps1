Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("d:\Proyectos\machupicchuandes\public\images\tripadvisor.png")
$bmp = New-Object System.Drawing.Bitmap($img)
for ($y=0; $y -lt $bmp.Height; $y++) {
    for ($x=0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # Only modify the bottom 60% of the image (the text part)
        if ($y -gt ($bmp.Height * 0.45)) {
            if ($c.A -gt 0 -and $c.R -lt 80 -and $c.G -lt 80 -and $c.B -lt 80) {
                $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($c.A, 255, 255, 255))
            }
        }
    }
}
$bmp.Save("d:\Proyectos\machupicchuandes\public\images\tripadvisor-white-text.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$bmp.Dispose()
Write-Host "Success"
