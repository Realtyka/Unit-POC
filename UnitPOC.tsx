import React, {useState} from 'react';
import {NativeModules, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  UNBookPaymentComponent,
  UNCardComponent,
  UNActivityComponent,
  UNAccountComponent,
  UNCheckDepositComponent,
  UNACHCreditComponent,
  UNMultipleCardsComponent,
  UNMultipleCardsComponentPaginationType,
} from 'react-native-unit-components';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const orgToken =
  'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiI3ODEwIiwic3ViIjoib21rYXJAdGhlcmVhbGJyb2tlcmFnZS5jb20iLCJleHAiOiIyMDI0LTEyLTA0VDEyOjMxOjMzLjQ5NVoiLCJqdGkiOiIyNzgxMTgiLCJvcmdJZCI6IjQxMjciLCJzY29wZSI6ImFwcGxpY2F0aW9ucyBhcHBsaWNhdGlvbnMtd3JpdGUgY3VzdG9tZXJzIGN1c3RvbWVycy13cml0ZSBjdXN0b21lci10YWdzLXdyaXRlIGN1c3RvbWVyLXRva2VuLXdyaXRlIGFjY291bnRzIGFjY291bnRzLXdyaXRlIGNhcmRzIGNhcmRzLXdyaXRlIGNhcmRzLXNlbnNpdGl2ZSBjYXJkcy1zZW5zaXRpdmUtd3JpdGUgdHJhbnNhY3Rpb25zIHRyYW5zYWN0aW9ucy13cml0ZSBhdXRob3JpemF0aW9ucyBzdGF0ZW1lbnRzIHBheW1lbnRzIHBheW1lbnRzLXdyaXRlIHBheW1lbnRzLXdyaXRlLWNvdW50ZXJwYXJ0eSBwYXltZW50cy13cml0ZS1saW5rZWQtYWNjb3VudCBhY2gtcGF5bWVudHMtd3JpdGUgd2lyZS1wYXltZW50cy13cml0ZSByZXBheW1lbnRzIHJlcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtYWNoLWRlYml0IGNvdW50ZXJwYXJ0aWVzIGNvdW50ZXJwYXJ0aWVzLXdyaXRlIGJhdGNoLXJlbGVhc2VzIGJhdGNoLXJlbGVhc2VzLXdyaXRlIGxpbmtlZC1hY2NvdW50cyBsaW5rZWQtYWNjb3VudHMtd3JpdGUgd2ViaG9va3Mgd2ViaG9va3Mtd3JpdGUgZXZlbnRzIGV2ZW50cy13cml0ZSBhdXRob3JpemF0aW9uLXJlcXVlc3RzIGF1dGhvcml6YXRpb24tcmVxdWVzdHMtd3JpdGUgY2hlY2stZGVwb3NpdHMgY2hlY2stZGVwb3NpdHMtd3JpdGUgcmVjZWl2ZWQtcGF5bWVudHMgcmVjZWl2ZWQtcGF5bWVudHMtd3JpdGUgZGlzcHV0ZXMgY2hhcmdlYmFja3MgY2hhcmdlYmFja3Mtd3JpdGUgcmV3YXJkcyByZXdhcmRzLXdyaXRlIGNoZWNrLXBheW1lbnRzIGNoZWNrLXBheW1lbnRzLXdyaXRlIGNyZWRpdC1kZWNpc2lvbnMgY3JlZGl0LWRlY2lzaW9ucy13cml0ZSBsZW5kaW5nLXByb2dyYW1zIGxlbmRpbmctcHJvZ3JhbXMtd3JpdGUiLCJvcmciOiJSZWFsIEJyb2tlcmFnZSBJbmMiLCJzb3VyY2VJcCI6IiIsInVzZXJUeXBlIjoib3JnIiwiaXNVbml0UGlsb3QiOmZhbHNlfSOBi9rOwKWjkSY4rrpUbuIQMJGEi5aK76MN5Z11RAqdhQcHQKPP-VWTDi7b-GTsf99jd2nbxwcTZy7fXtBhQAc';
const customerToken =
  'v2.public.eyJyb2xlIjoiY3VzdG9tZXIiLCJ1c2VySWQiOm51bGwsInN1YiI6ImN1c3RvbWVyLzE0Nzg2NjcvY2F0aHkuYmxhaXJAbXltYWlsLmNvbSIsImV4cCI6IjIwMjMtMTItMTJUMTU6NDQ6MTYuOTYxWiIsImp0aSI6bnVsbCwib3JnSWQiOiI0MTI3Iiwic2NvcGUiOiJhcHBsaWNhdGlvbnMgYXBwbGljYXRpb25zLXdyaXRlIGN1c3RvbWVycyBjdXN0b21lci10YWdzLXdyaXRlIGN1c3RvbWVyLXRva2VuLXdyaXRlIGFjY291bnRzIGFjY291bnRzLXdyaXRlIGNhcmRzIGNhcmRzLXdyaXRlIGNhcmRzLXNlbnNpdGl2ZSB0cmFuc2FjdGlvbnMgYXV0aG9yaXphdGlvbnMgc3RhdGVtZW50cyBwYXltZW50cyBwYXltZW50cy13cml0ZS1jb3VudGVycGFydHkgcGF5bWVudHMtd3JpdGUtbGlua2VkLWFjY291bnQgYWNoLXBheW1lbnRzLXdyaXRlIHdpcmUtcGF5bWVudHMtd3JpdGUgcmVwYXltZW50cyBwYXltZW50cy13cml0ZS1hY2gtZGViaXQgY291bnRlcnBhcnRpZXMgYmF0Y2gtcmVsZWFzZXMgYmF0Y2gtcmVsZWFzZXMtd3JpdGUgbGlua2VkLWFjY291bnRzIHdlYmhvb2tzIHdlYmhvb2tzLXdyaXRlIGV2ZW50cyBldmVudHMtd3JpdGUgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cyBhdXRob3JpemF0aW9uLXJlcXVlc3RzLXdyaXRlIGNoZWNrLWRlcG9zaXRzIGNoZWNrLWRlcG9zaXRzLXdyaXRlIHJlY2VpdmVkLXBheW1lbnRzIGRpc3B1dGVzIGNoYXJnZWJhY2tzIHJld2FyZHMgY2hlY2stcGF5bWVudHMgY3JlZGl0LWRlY2lzaW9ucyIsImN1c3RvbWVySWQiOiIxNDc4NjY3IiwidXNlclR5cGUiOiJjdXN0b21lciJ96Ysz4LAq5mTj5Dfy-8YsRLbfz3a14j9B57HQsdmh4Ni9t7m2RoelODdg-aCWOGIr45-eKikQB7zkfkdvwQ9LCw';

const UnitPOC: React.FC = () => {
  const {PushProvisioningModule} = NativeModules;

  // This is temporary hack to force the component to re-render
  const [key, setKey] = useState<number>(0);
  const updateKey = async () => {
    await (async () => {
      return new Promise(resolve => setTimeout(resolve, 5000));
    })();
    setKey(key + 1);
  };

  return (
    <ScrollView>
      <View style={{backgroundColor: Colors.white}}>
        <View style={styles.container}>
          <Text>Card Component</Text>
          <UNCardComponent
            cardId="1468586"
            customerToken={customerToken}
            pushProvisioningModule={PushProvisioningModule}
          />
        </View>

        <View
          key={key}
          style={{...styles.container, ...styles.bookPaymentsContainer}}>
          <Text>Book Payments Component</Text>
          <UNBookPaymentComponent
            customerToken={orgToken}
            accountId="2251133"
            counterPartyAccountId="2327394"
            counterPartyName="Matthew Thomas"
            onPaymentCreated={() => updateKey()}
          />
        </View>

        {/* ISSUE: Filter click doesn't work ?! */}
        <View style={styles.container}>
          <Text>Activity Component</Text>
          <UNActivityComponent
            customerToken={orgToken}
            accountId="2251133"
            // queryFilter="filter[since]=2023-01-01T00:00:00.000Z&filter[until]=2023-04-26T00:00:00.000Z&sort=-createdAt"
          />
        </View>

        {/* ISSUE: Inner action buttons doesn't work ?! */}
        <View style={styles.container}>
          <Text>Account Component</Text>
          <UNAccountComponent customerToken={orgToken} accountId="2251133" />
        </View>

        <View style={styles.container}>
          <Text>Check Deposit Component</Text>
          <UNCheckDepositComponent
            customerToken={orgToken}
            accountId="2251133"
            fee={1.5}
          />
        </View>

        {/* TODO: integrate after Plaid is set up */}
        {/* <View>
          <Text>ACH Debit Payment Component</Text>
          <UNACHDebitComponent customerToken={orgToken} accountId={'1105561'} />
        </View> */}

        <View style={{...styles.container, ...styles.bookPaymentsContainer}}>
          <Text>ACH Credit Component</Text>
          <UNACHCreditComponent customerToken={orgToken} accountId="2335034" />
        </View>

        <View style={styles.container}>
          <Text>Multiple Cards Component</Text>
          <UNMultipleCardsComponent
            customerToken={orgToken}
            paginationType={UNMultipleCardsComponentPaginationType.pagination}
            cardsPerPage={4}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    rowGap: 4,
    borderWidth: 1,
    borderColor: '#808080',
    padding: 4,
  },
  bookPaymentsContainer: {
    height: 600,
  },
});

export default UnitPOC;
