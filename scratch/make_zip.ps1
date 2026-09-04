$source = "c:\Users\guruv\Downloads\far[m]ate-2.1"
$stage = "c:\Users\guruv\Downloads\farmate-2.1"
$zipDest = "c:\Users\guruv\Downloads\farmate-2.1.zip"
$projectZip = "c:\Users\guruv\Downloads\far[m]ate-2.1\farmate-2.1.zip"

Write-Host "Creating zip package for Far[m]ate 2.1..."

# Create a clean temp staging folder
$tempFolder = "c:\Users\guruv\Downloads\farmate_temp_staging"
if (Test-Path -LiteralPath $tempFolder) {
    Remove-Item -LiteralPath $tempFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $tempFolder -Force | Out-Null

# Robocopy files excluding node_modules, git, scratch, and zip files
& robocopy $source $tempFolder /E /XD node_modules .git scratch /XF *.zip
Write-Host "Files copied to staging. Robocopy exit code: $LASTEXITCODE"

# Remove existing zip if any
if (Test-Path -LiteralPath $zipDest) {
    Remove-Item -LiteralPath $zipDest -Force
}
if (Test-Path -LiteralPath $projectZip) {
    Remove-Item -LiteralPath $projectZip -Force
}

# Compress staging directory
Write-Host "Compressing files into $zipDest..."
Compress-Archive -Path "$tempFolder\*" -DestinationPath $zipDest -Force

# Copy into project root for convenience
Copy-Item -LiteralPath $zipDest -Destination $projectZip -Force

# Clean up staging folder
Remove-Item -LiteralPath $tempFolder -Recurse -Force

Write-Host "Zip package created successfully!"
Get-Item -LiteralPath $zipDest, $projectZip | Format-Table FullName, Length, LastWriteTime
