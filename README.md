AI model used: https://huggingface.co/Xenova/whisper-large-v3  
(The first time you use, it will take a while downloading the model)

## Lame must be installed in your system.  
If you have not installed LAME yet, please use the following instruction.

Install on Debian  
```
$ sudo apt-get install lame
```

Install on MacOS with brew  
```
$ brew install lame
```

Install on Windows  
```
Go to the the Lame Download Page and download the EXE or ZIP file.  
Navigate to the directory Lame was installed in (most commonly C:\Program Files (x86)\Lame For Audacity).  
Add the directory to your Environment Variables.
```

## How to use
Start the api: 
```
node app
```

Run the record script in another terminal:  
```
node record
```
(CTRL or CMD) + C to stop recording
