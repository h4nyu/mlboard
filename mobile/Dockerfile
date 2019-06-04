FROM node:12-slim
RUN apt-get update \
    && apt-get install -y \
    unzip

RUN wget https://github.com/AdoptOpenJDK/openjdk8-binaries/releases/download/jdk8u212-b03/OpenJDK8U-jdk_x64_linux_hotspot_8u212b03.tar.gz \
    && tar -xf OpenJDK8U-jdk_x64_linux_hotspot_8u212b03.tar.gz \
    && rm OpenJDK8U-jdk_x64_linux_hotspot_8u212b03.tar.gz
ENV PATH=$PWD/jdk8u212-b03/bin:$PATH
ENV ANDROID_HOME=/usr/local/android-sdk-linux
ENV PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools
RUN mkdir $ANDROID_HOME && \
    wget -O sdk.zip "https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip" && \
    unzip -d $ANDROID_HOME sdk.zip && \
    rm sdk.zip && \
    mkdir ~/.android && \
    touch ~/.android/repositories.cfg
RUN yes | sdkmanager --licenses
RUN npm install -g react-native-cli

WORKDIR /srv
COPY ./ /srv
