package logger

import (
	"log"
	"os"
)

var (
	logInstance *log.Logger
)

func GetLogger() *log.Logger {

	return logInstance
}

func CreateLogger(prefix, fileName string) {

	logFileNameWithPath := fileName

	file, err := openCreateLogFile(logFileNameWithPath)

	if err != nil {
		log.Fatal(err)
	}

	logInstance = log.New(file, prefix, log.Ldate|log.Ltime|log.Lshortfile)

	GetLogger().Println("FILE SEARCH SERVICE START")

}

func openCreateLogFile(fileName string) (*os.File, error) {

	file, err := os.OpenFile(fileName, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0666)

	if err != nil {
		log.Fatal(err)
	}

	_, err = file.Stat()

	return file, err
}
