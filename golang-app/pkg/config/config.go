package config

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

var (
	config Config
)

func GetConfig() Config {

	return config
}

type Config map[string]string

func Initialize(configFilePath string) {

	ConfigList := make(Config)

	loadFromFile(&ConfigList, configFilePath)

	config = ConfigList

}

func loadFromFile(entity interface{}, filePath string) {

	jsonFile, err := os.Open(filePath)

	if err != nil {
		os.Exit(1)
	}

	defer jsonFile.Close()

	values, _ := ioutil.ReadAll(jsonFile)

	err = json.Unmarshal(values, entity)

	if err != nil {
		os.Exit(1)
	}
}
