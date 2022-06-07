import { CertificateEntity } from '@/common/entities';
import Flexbox from '@/view/common/components/Flexbox';
import { Facility } from '@/view/common/types/Facility';
import { NotificationSeverity } from '@/view/common/types/Notification';
import { ApplicationState } from '@/view/store';
import { notify } from '@/view/store/actions/app/notify';
import styled from '@emotion/styled';
import {
  CheckCircleOutlineRounded,
  NewReleases,
  Info,
  PriorityHigh,
} from '@mui/icons-material';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { HttpStatus } from '@nestjs/common/enums';
import { ReactElement, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.5rem;
  box-sizing: border-box;
`;

const useStyles = makeStyles(() => ({
  btnGroup: {
    flexDirection: 'row-reverse',
    '& button': {
      borderRadius: '8px',
    },
  },
}));

const connector = connect(
  (state: ApplicationState) => ({
    facilityId: state.facilityDetail.facility.id,
  }),
  { notify },
);

function CertificateInfo({
  facilityId,
  notify,
}: ConnectedProps<typeof connector>): ReactElement {
  const styles = useStyles();
  const [facilityInfo, setFacilityInfo] = useState<Facility>(null);
  const [certificateInfo, setCertificateInfo] =
    useState<CertificateEntity>(null);

  let order = 0;
  let text = 'Chưa cấp';

  if (
    certificateInfo?.expiredDate === null &&
    certificateInfo?.revoked === null
  ) {
    text = 'Chưa cấp';
    order = 1;
  } else if (certificateInfo?.revoked === 1) {
    text = 'Đã thu hồi, chưa cấp mới';
    order = 2;
  } else if (certificateInfo?.expiredDate) {
    if (new Date(certificateInfo?.expiredDate) < new Date()) {
      text = 'Hết hạn, chưa thu hồi';
      order = 3;
    } else {
      text = 'Còn hiệu lực';
      order = 4;
    }
  }

  const startDateString = new Date(
    certificateInfo?.issuedDate,
  ).toLocaleDateString();
  const endDateString = new Date(
    certificateInfo?.expiredDate,
  ).toLocaleDateString();

  useEffect(() => {
    if (facilityId === 0) return;

    fetch(`/api/facilities/id/${facilityId}`)
      .then((res) => res.json())
      .then((data) => {
        const { statusCode, message, body } = data;

        if (statusCode === HttpStatus.OK) {
          setFacilityInfo(body);
        } else {
          notify(
            'Lấy thông tin cơ sở không thành công',
            NotificationSeverity.ERROR,
            message,
          );
        }
      })
      .catch((err) => {
        notify(
          'Lỗi khi lấy thông tin về cơ sở',
          NotificationSeverity.ERROR,
          err,
        );
      });

    fetch(`/api/certificate/facilityid/${facilityId}`)
      .then((res) => res.json())
      .then((data) => {
        const { statusCode, message, body } = data;

        if (statusCode === HttpStatus.OK) {
          setCertificateInfo(body);
        } else {
          setCertificateInfo(body);
          notify(
            'Lấy thông tin giấy chứng nhận không thành công',
            NotificationSeverity.ERROR,
            message,
          );
        }
      })
      .catch((err) => {
        notify(
          'Lỗi khi lấy thông tin về giấy chứng nhận',
          NotificationSeverity.ERROR,
          err,
        );
      });
  }, [facilityId]);

  return (
    <Root>
      <Typography variant="h5" textAlign="center">
        Thông tin về giấy chứng nhận vệ sinh an toàn thực phẩm
      </Typography>
      <Grid container spacing={2} my="1rem" maxWidth="600px" mx="auto">
        <Grid item xs={4}>
          <Typography>Cơ sở: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{facilityInfo?.name}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Chủ cơ sở: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{facilityInfo?.ownerName}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Số cấp: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{certificateInfo?.issueId}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Cấp bởi: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{certificateInfo?.issuedBy}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Thời gian hiệu lực:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>
            {startDateString !== 'Invalid Date' &&
              `Từ ngày ${startDateString} đến ngày ${endDateString}`}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Trạng thái: </Typography>
        </Grid>
        <Grid item xs={8} sx={{ display: 'flex' }}>
          <Grid item xs={1}>
            {order === 4 ? (
              <CheckCircleOutlineRounded color="success" />
            ) : order === 3 ? (
              <NewReleases color="error" />
            ) : order === 2 ? (
              <Info color="info" />
            ) : (
              <PriorityHigh color="warning" />
            )}
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body1" fontWeight="bold" mt="0rem" noWrap>
              {text}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Divider />

      <Flexbox className={styles.btnGroup}>
        <Button
          variant="outlined"
          sx={{ margin: '1rem 0rem 1rem 0', height: '40px' }}
          disabled={order > 2}
        >
          Cấp mới
        </Button>
        <Button
          variant="contained"
          color="warning"
          sx={{ margin: '1rem 1rem 1rem 0', height: '40px' }}
          disabled={order <= 2}
        >
          Thu hồi
        </Button>
      </Flexbox>
    </Root>
  );
}

export default connector(CertificateInfo);
