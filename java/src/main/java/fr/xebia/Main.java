package fr.xebia;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;

public class Main {
    static final Logger LOGGER = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) throws InterruptedException {
        List<String> users = Arrays.asList("A", "B", "C");
        String userId = "XCTYPO-YDGBNC";
        Integer timeToProcess = 87;
        RuntimeException npe = new NullPointerException();

        LOGGER.info("Read count=" + users.size() + " users in database in duration=" + timeToProcess + "ms with log type=dbread");
        LOGGER.error("Error when insert userId="+ userId +" into database with log type=dbread", npe);

        Thread.sleep(2000);
    }
}
