package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

var config Config

type Config map[string]string

func GetConfig() Config {
	return config
}

func FillFromConfigFile(configFilePath string) {

	ConfigList := make(Config)

	loadFromFile(&ConfigList, configFilePath)

	config = ConfigList

}

func loadFromFile(entity interface{}, filePath string) {

	_, err := os.Stat(filePath)

	if os.IsNotExist(err) {

		json.Marshal(entity)

		return
	}

	jsonFile, err := os.Open(filePath)

	if err != nil {
		fmt.Println(filePath + " file is not readable " + err.Error())
		return
	}

	defer jsonFile.Close()

	values, _ := ioutil.ReadAll(jsonFile)

	err = json.Unmarshal(values, entity)

	if err != nil {
		fmt.Println(filePath + " file's content must be valid json " + err.Error())
	}
}
