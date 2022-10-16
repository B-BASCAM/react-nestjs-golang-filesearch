package pkg

import (
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
)

func WaitForTerminate() {
	osSignal := make(chan os.Signal, 1)
	signal.Notify(osSignal, syscall.SIGTERM, syscall.SIGINT)
	<-osSignal
}

func SetWorkingDirectory() {
	p, _ := os.Executable()
	path := filepath.Dir(p)
	e := os.Chdir(path)
	if e != nil {

	}
}
