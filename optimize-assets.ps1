Add-Type -AssemblyName System.Drawing

function Save-Jpeg($image, $path, $quality = 84L) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
  $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
  $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, $quality)
  $image.Save($path, $codec, $parameters)
  $parameters.Dispose()
}

function Resize-Asset($file, $maxDimension, $asJpeg = $false) {
  $source = [System.Drawing.Image]::FromFile($file.FullName)
  try {
    $scale = [Math]::Min(1.0, $maxDimension / [Math]::Max($source.Width, $source.Height))
    if ($scale -ge 1 -and -not $asJpeg) { return }
    $width = [Math]::Max(1, [int]($source.Width * $scale))
    $height = [Math]::Max(1, [int]($source.Height * $scale))
    $pixelFormat = if ($asJpeg) { [System.Drawing.Imaging.PixelFormat]::Format24bppRgb } else { [System.Drawing.Imaging.PixelFormat]::Format32bppArgb }
    $bitmap = [System.Drawing.Bitmap]::new($width, $height, $pixelFormat)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        if ($asJpeg) { $graphics.Clear([System.Drawing.Color]::FromArgb(8, 12, 18)) }
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.DrawImage($source, 0, 0, $width, $height)
      } finally { $graphics.Dispose() }
      $temp = "$($file.FullName).optimized"
      if ($asJpeg) { Save-Jpeg $bitmap $temp } else { $bitmap.Save($temp, [System.Drawing.Imaging.ImageFormat]::Png) }
    } finally { $bitmap.Dispose() }
  } finally { $source.Dispose() }
  Move-Item -LiteralPath $temp -Destination $file.FullName -Force
}

$assetRoot = Join-Path $PSScriptRoot 'assets'
Get-ChildItem -LiteralPath $assetRoot -File | ForEach-Object {
  if ($_.Name -like 'member-*') { Resize-Asset $_ 720 }
  elseif ($_.Name -like 'robot-*') { Resize-Asset $_ 1400 }
  elseif ($_.Name -like 'sponsor-*' -and $_.Extension -eq '.png') { Resize-Asset $_ 1200 }
  elseif ($_.Name -like 'award-*.png') { Resize-Asset $_ 1200 }
  elseif ($_.Name -like 'award-*.jpg') { Resize-Asset $_ 1600 $true }
  elseif ($_.Name -like 'bg-*.jpg') { Resize-Asset $_ 2560 $true }
  elseif ($_.Name -like 'bg-*.png') { Resize-Asset $_ 2560 }
  elseif ($_.Name -eq 'home-bg.jpg') { Resize-Asset $_ 2560 $true }
}
