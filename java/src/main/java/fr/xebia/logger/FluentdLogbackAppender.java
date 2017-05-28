package fr.xebia.logger;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.fluentd.logger.FluentLogger;

import ch.qos.logback.classic.pattern.CallerDataConverter;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.classic.spi.ThrowableProxyUtil;
import ch.qos.logback.core.UnsynchronizedAppenderBase;

public class FluentdLogbackAppender extends UnsynchronizedAppenderBase<ILoggingEvent> {
    private FluentLogger fluentLogger;
    private Pattern patternMetadata = Pattern.compile("([\\w\\d-]+=[\\w\\d-]+)+", Pattern.CASE_INSENSITIVE);

    @Override
    public void start() {
        super.start();
        fluentLogger = FluentLogger.getLogger(label != null ? tag : null, remoteHost, port);
    }

    @Override
    public void stop() {
        try {
            super.stop();
        } finally {
            if (fluentLogger != null) {
                fluentLogger.close();
            }
        }
    }

    @Override
    protected void append(ILoggingEvent rawData) {
        final Map<String, Object> data = new HashMap<>();
        data.put("message", rawData.getFormattedMessage());
        data.put("logger", rawData.getLoggerName());
        data.put("thread", rawData.getThreadName());
        data.put("level", rawData.getLevel());
        if (rawData.getMarker() != null) {
            data.put("marker", rawData.getMarker());
        }
        if (rawData.hasCallerData()) {
            data.put("caller", new CallerDataConverter().convert(rawData));
        }
        if (rawData.getThrowableProxy() != null) {
            data.put("throwable", ThrowableProxyUtil.asString(rawData.getThrowableProxy()));
        }
        if (additionalFields != null) {
            data.putAll(additionalFields);
        }
        for (Entry<String, String> entry : rawData.getMDCPropertyMap().entrySet()) {
            data.put(entry.getKey(), entry.getValue());
        }

        Map<String, Object> metaData = extractMetaData(rawData.getFormattedMessage());
        for (Entry<String, Object> entry : metaData.entrySet()) {
            data.put(entry.getKey(), entry.getValue());
        }

        if (label == null) {
            fluentLogger.log(tag, data, rawData.getTimeStamp() / 1000);
        } else {
            fluentLogger.log(label, data, rawData.getTimeStamp() / 1000);
        }
    }

    private Map<String, Object> extractMetaData(String message) {
        Matcher m = patternMetadata.matcher(message);
        Map<String, Object> metaData = new HashMap<>(0);
        while (m.find()) {
            String s[] = m.group().split("=");
            if(s.length == 2) {
                metaData.put(s[0], convertData(s[1]));
            }
        }
        return metaData;
    }

    private Object convertData(String dataToConvert) {
        if(isNumeric(dataToConvert)) {
            return Double.parseDouble(dataToConvert);
        } else { return dataToConvert; }
    }


    private boolean isEmpty(final CharSequence cs) {
        return cs == null || cs.length() == 0;
    }

    private boolean isNumeric(final CharSequence cs) {
        if (isEmpty(cs)) {
            return false;
        }
        final int sz = cs.length();
        for (int i = 0; i < sz; i++) {
            if (!Character.isDigit(cs.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    private String tag;
    private String label;
    private String remoteHost;
    private int port;
    private Map<String, String> additionalFields;

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getRemoteHost() {
        return remoteHost;
    }

    public void setRemoteHost(String remoteHost) {
        this.remoteHost = remoteHost;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public void addAdditionalField(Field field) {
        if (additionalFields == null) {
            additionalFields = new HashMap<String, String>();
        }
        additionalFields.put(field.getKey(), field.getValue());
    }

    public static class Field {
        private String key;
        private String value;

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }
}
