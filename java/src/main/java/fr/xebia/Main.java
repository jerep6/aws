package fr.xebia;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class Main {
    static final Logger LOGGER = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) throws InterruptedException {
        // Set variables for testing logs
        List<String> users = Arrays.asList("A", "B", "C");
        String userId = "XCTYPO";
        Integer timeToProcess = 87;
        RuntimeException npe = new NullPointerException();
        UUID requestId = UUID.randomUUID();

        // set global information for all future logs in the thread
        MDC.put("request_id", requestId.toString());

        LOGGER.info("Read count={} users in database in duration={} ms with log type=dbread", users.size(), timeToProcess);
        LOGGER.error("Error when insert userId="+ userId +" into database with log type=dbread", npe);

        Thread.sleep(2000);
        MDC.clear();
    }

}
